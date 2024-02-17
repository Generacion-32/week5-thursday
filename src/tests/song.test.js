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
test("GET -> 'URL_SONGS', should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_SONGS)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].artists).toBeDefined()
  expect(res.body[0].artists).toHaveLength(0)

  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)

})

//get one
test("GET ONE -> 'URL_SONGS/:id', should return status code 200 and res.body.name === song.name", async () => {
  const res = await request(app)
    .get(`${URL_SONGS}/${songId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(song.name)
})

//put
test("PUT -> 'URL_SONGS/:id', should return status code 200 and res.body.name === songUpdate.name", async () => {

  const songUpdate = {
    name: "give me a kiss"
  }

  const res = await request(app)
    .put(`${URL_SONGS}/${songId}`)
    .send(songUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(songUpdate.name)
})

test("Delte 'URL_SONGS', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_SONGS}/${songId}`)

  expect(res.statusCode).toBe(204)
  await album.destroy()
})