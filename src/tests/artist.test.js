require('../models')

const request = require("supertest")
const app = require("../app")

const URL_ARTISTS = '/artists'

const artist = {
  name: "The Beattles",
  country: "England",
  formationYear: 1966,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuViPHZsis4_A-LlKe_OkB7Np5_DV85gsVmStxVgM&usqp=CAE&s"
}

let artistId

test("Post ->'URL_ARTISTS', should return 201, res.body to be defined and res.body.name = artist.name", async () => {
  const res = await request(app)
    .post(URL_ARTISTS)
    .send(artist)

  artistId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)
})

test("Get -> 'URL_ARTISTS', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(URL_ARTISTS)


  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> 'URL_ARTISTS/:id', should return status code 200, res.body to be defined and res.body.name= artist.name", async () => {
  const res = await request(app)
    .get(`${URL_ARTISTS}/${artistId}`)

  // console.log(res);
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)

})

test("PUT -> 'URL_ARTISTS/:id', should return status code 200, res.body to be defined and res.body.name = 'Marylin mason'", async () => {

  const res = await request(app)
    .put(`${URL_ARTISTS}/${artistId}`)
    .send({ name: 'Marylin mason' })

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe('Marylin mason')
})


test("Delete -> 'URL_ARTISTS:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_ARTISTS}/${artistId}`)

  expect(res.status).toBe(204)
})

