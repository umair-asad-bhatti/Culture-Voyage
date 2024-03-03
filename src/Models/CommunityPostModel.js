import { formatDate } from "../utils/index.js";

class CommunityPostModel {
  constructor(createdBy, communityID, description, title, publicIDs = [], secureURLs = [], postType) {
    this["Created By"] = createdBy;
    this["Created At"] = new Date() //change format
    this["Community ID"] = communityID;
    this["Description"] = description;
    this["Title"] = title;
    this["Media Public ID"] = publicIDs;
    this["Media URL"] = secureURLs;
    this['Post Type'] = postType;

  }
}
export { CommunityPostModel };
