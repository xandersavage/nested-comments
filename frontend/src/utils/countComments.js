export const countComment = (commentsArray) => {
    let count = 0
    if (!commentsArray) return 0

    commentsArray.forEach(comment => {
        count++

        if(comment.replies && comment.replies.length > 0) {
            count += countComment(comment.replies)
        }
    })

    return  count
}