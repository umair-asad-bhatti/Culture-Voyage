class CommentModel {

    constructor(createdBy, description, postID) {
        this["Created By"] = createdBy;
        this["Created At"] = new Date() //change format
        this["Description"] = description;
        this["Post ID"] = postID;
        // this["Media Public ID"] = publicIDs;
        // this["Media URL"] = secureURLs;
        // this['Likes'] = [];
        // this['Edited'] = false
    }
}
export { CommentModel }