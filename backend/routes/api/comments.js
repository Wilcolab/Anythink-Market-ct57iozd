/**
 * Express router to handle comment-related routes.
 * @module routes/api/comments
 * @requires express
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

/**
* Creates a new Comment instance with the data provided in the request body.
*
* @param {Object} req - The request object.
* @param {Object} req.body - The body of the request containing comment data.
* @returns {Comment} The newly created Comment instance.
*/
router.post("/", async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        /**
         * Deletes a comment by its ID.
         *
         * @param {Object} req - The request object.
         * @param {Object} req.params - The request parameters.
         * @param {string} req.params.id - The ID of the comment to delete.
         * @returns {Promise<Object|null>} The deleted comment object, or null if no comment was found.
         */
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


