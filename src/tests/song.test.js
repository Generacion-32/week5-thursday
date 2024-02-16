require("../models")
const request = require("supertest")
const app = require('../app')
const Album = require("../models/Album")

let song
let album
let songId

const URL_SONGS = '/songs'

beforeAll(async () => {

  album = await Album.create({
    name: 'lorem20',
    image: 'lorem40',
    releaseYear: 2010
  })

  song = {
    name: 'Hey Jude',
    albumId: album.id
  }
})

test("Post -> 'URL_SONGS', should return status code 201, res.body to be defined and res.body.song = song.name", async () => {

  const res = await request(app)
    .post(URL_SONGS)
    .send(song)

  songId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(song.name)

})


//get all

//get one

//put

test("Delte 'URL_SONGS', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_SONGS}/${songId}`)

  expect(res.statusCode).toBe(204)
  await album.destroy()
})