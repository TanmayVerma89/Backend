import { END, START, StateGraph, StateSchema } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { HumanMessage } from "langchain";
import { z } from "zod";

import { cohereModel, mistralModel, judge } from "./ai.service.js";

const State = new StateSchema({
    problem: z.string().default(""),
    solution1: z.string().default(""),
    solution2: z.string().default(""),

    judgement: z
        .object({
            solution1_score: z.number().default(0),
            solution1_feedback: z.string(),
            solution2_score: z.number().default(0),
            solution2_feedback: z.string(),
        })
        .default({
            solution1_score: 0,
            solution1_feedback: "",
            solution2_score: 0,
            solution2_feedback: "",
        }),
});

const solutionNode: GraphNode<typeof State> = async (state) => {
    const {problem} = state;
    const [mistralResponse, cohereResponse] = await Promise.all([
        mistralModel.invoke(problem),
        cohereModel.invoke(problem),
    ]);

    return {
        solution1: mistralResponse.text,
        solution2: cohereResponse.text,
    };
};

const judgeNode: GraphNode<typeof State> = async (state) => {
    const {problem , solution1 , solution2 , judgement} = state
    const judgePrompt = `You are an expert AI response evaluator.Your task is to objectively compare two AI-generated responses to the same problem.
## Problem
${problem}

## Response 1
${solution1}

## Response 2
${solution2}

## Evaluation Criteria

Evaluate each response based on:

1. Correctness
   - Is the answer factually and logically correct?
   - Does the code/solution actually work if the problem requires code?

2. Relevance
   - Does it directly answer the problem?
   - Does it avoid unnecessary information?

3. Completeness
   - Does it address all important parts of the problem?

4. Reasoning
   - Is the explanation logically sound?
   - Are important assumptions handled correctly?

5. Quality
   - Is the response clear, well-structured, and useful?

6. Hallucinations
   - Penalize fabricated facts, APIs, syntax, or unsupported claims.

## Scoring

Give each response a score from 0 to 10:

0 = completely incorrect/useless
2 = mostly incorrect
4 = significant problems
5 = partially correct
6 = acceptable
7 = good
8 = very good
9 = excellent
10 = essentially perfect

Be strict and objective.

Provide the feedback on every responses. State that what could be improved and why or why not did you deduct points from the score 
## solution1_feedback: ${judgement.solution1_feedback}
## solution2_feedback: ${judgement.solution2_feedback}
`;

    const result = await judge.invoke({
        messages: [new HumanMessage(judgePrompt)],
    });

    return {
        judgement: result.structuredResponse,
    };
};

// Graph
const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)

    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)

    .compile();

// Public Function
export async function useGraph(userMessage: string) {
    if (!userMessage.trim()) {
        throw new Error("User message cannot be empty.");
    }

    return graph.invoke({
        problem: userMessage,
    });
}
