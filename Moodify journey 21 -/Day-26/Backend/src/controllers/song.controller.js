const id3 = require('node-id3');
const storageService = require('../services/storage.service');
const songModel = require('../models/song.model');

async function uploadSong(req, res) {
    const songBuffer = req.file.buffer;
    const { mood } = req.body;
    const tags = id3.read(songBuffer);

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + 'mp3',
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + 'jpeg',
            folder: "/cohort-2/moodify/songPosters"
        })
    ])

    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood
    })

    return res.status(201).json({
        message: `Song uploaded successfully`,
        song
    });

}

async function getSong(req, res) {
    const mood = req.query.mood;

    const song = await songModel.findOne({
        mood: mood
    })

    return res.status(200).json({
        message: `song fetched for ${mood} mood`,
        song
    });
}

module.exports = {
    uploadSong,
    getSong
}