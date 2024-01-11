import { TaskModel } from '../src/schema'
import app from '../src/server'
import chai from 'chai'
import chaiHttp from 'chai-http'

const assert = chai.assert

chai.use(chaiHttp)

describe('Integration Test', () => {
  it('Gets tasks', (done) => {
    chai
      .request(app)
      .get('/tasks')
      .end((err, res) => {
        assert.equal(res.statusCode, 200)
        assert.isArray(res.body.tasks)
        done()
      })
  })

  it('Inserts a task', (done) => {
    const task = {
      summary: 'Test task',
      status: 'todo',
      size: 'm',
    }
    chai
      .request(app)
      .post('/tasks')
      .send(task)
      .end(async (err, res) => {
        assert.equal(res.statusCode, 200)
        const inserted = await TaskModel.findById(res.body._id)
        assert.isNotNull(inserted)
        assert.equal(inserted!.summary, task.summary)
        assert.equal(inserted!.status, task.status)
        assert.equal(inserted!.size, task.size)
        await TaskModel.findByIdAndDelete(res.body._id)

        done()
      })
  })

  it('Gets a specific task', async () => {
    const task = {
      summary: 'Test task',
      status: 'todo',
      size: 'm',
    }
    const inserted = await TaskModel.create(task)
    chai
      .request(app)
      .get(`/tasks/${inserted._id}`)
      .end(async (err, res) => {
        assert.equal(res.statusCode, 200)

        assert.equal(res.body.summary, task.summary)
        assert.equal(res.body.status, task.status)
        assert.equal(res.body.size, task.size)

        await TaskModel.findByIdAndDelete(res.body._id)
      })
  })

  it('Deletes a specific task', async () => {
    const task = {
      summary: 'Test task',
      status: 'todo',
      size: 'm',
    }
    const inserted = await TaskModel.create(task)
    chai
      .request(app)
      .delete(`/tasks/${inserted._id}`)
      .end(async (err, res) => {
        assert.equal(res.statusCode, 200)

        const deleted = await TaskModel.findById(inserted._id)
        assert.isNull(deleted)
      })
  })

  it('Updates a specific task', async () => {
    const task = {
      summary: 'Test task',
      status: 'todo',
      size: 'm',
    }
    const inserted = await TaskModel.create(task)
    chai
      .request(app)
      .put(`/tasks/${inserted._id}`)
      .send({
        ...task,
        summary: 'Updated task',
      })
      .end(async (err, res) => {
        assert.equal(res.statusCode, 200)

        const updated = await TaskModel.findById(inserted._id)
        assert.isNotNull(updated)
        assert.equal(updated!.summary, 'Updated task')
        assert.equal(updated!.status, task.status)
        assert.equal(updated!.size, task.size)
        await TaskModel.findByIdAndDelete(res.body._id)
      })
  })
})
