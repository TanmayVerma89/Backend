import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ─────────────────────────────────────────────────────────
   MOCK DATA  (swap the fetch() call in App.jsx)
───────────────────────────────────────────────────────── */
export const MOCK = {
  message: "Successfull",
  result: {
    problem: "Explain MCP servers and how to start using and build own MCP server",
    solution1: "### **What Are MCP Servers?**\n**MCP (Minecraft: Pocket Edition / Pocket Edition Client) servers** are custom servers that allow players to play **Minecraft Pocket Edition (PE)** in a multiplayer environment.\n\nHowever, **MCP servers** are built using **Bedrock Edition** protocols, allowing players to connect to them even on **Android/iOS devices** (via **Bedrock Edition clients**).\n\n---\n\n## **How MCP Servers Work**\n1. **Protocol Compatibility**\n   - MCP servers use **Bedrock Edition (BE) protocols**.\n   - Players connect via **Bedrock Edition clients** (Android/iOS, PC, consoles).\n\n2. **Hosting & Software**\n   - Typically hosted on **Linux servers** (Ubuntu/Debian).\n   - Uses **Bedrock Edition server software**.\n\n---\n\n## **Getting Started**\n\n### Option 1: Pre-Built Server\n1. Find a public MCP server\n2. Install Bedrock Edition Client\n3. Connect via server IP/port\n\n### Option 2: Host Your Own\n\n```bash\n# Update system\nsudo apt update && sudo apt upgrade -y\n\n# SSH into server\nssh root@your-server-ip\n\n# Start server\n./server.sh start\ntail -f server.log\n```\n\n#### Firewall Setup\n```bash\nsudo ufw allow 19135/tcp\nsudo ufw enable\n```\n\n| Issue | Solution |\n|-------|----------|\n| Can't connect | Check firewall, port forwarding |\n| Server crashes | Check logs, increase heap size |\n| Performance lag | Optimize plugins, use SSD |\n\n✅ **Use a VPS** for reliable hosting.\n✅ **Backup regularly** (`tar -czvf backup.tar.gz /data`).",
    solution2: "### What is an MCP Server?\n\n**MCP** stands for **Minecraft Coder Pack**, tools used to decompile, modify, and recompile Minecraft's source code — primarily for mod development.\n\n### Key Components:\n1. **Minecraft Server Software**: The base server (Vanilla).\n2. **Modding API**: **Forge** or **Fabric** for loading mods.\n3. **Mods**: Modifications that change gameplay.\n\n---\n\n### Setting Up a Forge Server\n\n#### Step 1: Install Java\nDownload the JDK from Oracle or Adoptium.\n\n#### Step 2: Install Forge\n```bash\njava -jar forge-<version>-installer.jar\n```\n\n#### Step 3: Add Mods\nPlace `.jar` mod files into the `mods/` folder.\n\n#### Step 4: Configure\n```properties\neula=true\ngamemode=survival\n```\n\n#### Step 5: Run\n```bash\njava -jar forge-<version>.jar nogui\n```\n\n### Tips\n- Optimize with **Lithium** or **Phosphor** mods\n- Backup regularly\n- Use **Pterodactyl** for server management",
    judgement: {
      solution1_score: 9,
      solution1_feedback: "Response 1 is **exceptionally thorough** and **highly relevant** to the original query. It correctly explains MCP servers as **Bedrock Edition-based servers** compatible with Minecraft Pocket Edition clients.\n\n- **Correct factual accuracy** on MCP servers' compatibility, hosting requirements, and features.\n- **Comprehensive step-by-step instructions** for both using pre-built MCP servers and hosting one.\n- **Practical usefulness** — actionable and well-structured.\n\nOverall, this is an **ideal response** for someone seeking to understand and set up an MCP server.",
      solution2_score: 2,
      solution2_feedback: "Response 2 is **fundamentally incorrect** for the given query and contains several **hallucinations and factual errors**.\n\n- **Incorrect Definition**: MCP servers are **not** about Forge/Fabric modding.\n- **Relevance**: Completely ignores MCP servers for multiplayer Minecraft PE/Bedrock.\n- **Completeness**: Omits all details about Bedrock Edition compatibility and hosting.\n\n**Summary**: This response is **completely off-topic, factually wrong, and unusable** for the given query."
    }
  }
};

/* ─────────────────────────────────────────────────────────
   MARKDOWN RENDERER
───────────────────────────────────────────────────────── */
export function MD({ children }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ children: codeChildren, className, ...props }) {
            const language = /language-([\w-]+)/.exec(className || '')?.[1];

            if (!language) {
              return <code className={className} {...props}>{codeChildren}</code>;
            }

            const code = String(codeChildren).replace(/\n$/, '');
            const highlighted = hljs.getLanguage(language)
              ? hljs.highlight(code, { language }).value
              : hljs.highlightAuto(code).value;

            return (
              <code
                className={`hljs ${className}`}
                dangerouslySetInnerHTML={{ __html: highlighted }}
                {...props}
              />
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
