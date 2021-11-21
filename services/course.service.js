const courseModel = require("../model/course.model");

module.exports = {
    async getAllCourseByUserId(userId) {
        return await courseModel.all(userId)
    },

    async addCourse(name, hostId, topic = null) {
        const course = await courseModel.add({
            course_name: name,
            course_hostid: hostId,
            course_topic: topic,
            course_createdate: new Date()
        })
        return course
    },

    async deleteCourseById(id) {
        await courseModel.del({course_id: id})
    },

    async getCourseById(id) {
        return await courseModel.single(id)
    }
}
