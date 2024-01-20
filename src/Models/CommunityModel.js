class CommunityModel {
  constructor( imageAsset,title, description,createdBy,bannerPublicId) {
    this["Created By"]=createdBy
    this["Created At"]=new Date() //change format
    this["Community ID"] = null;
    this["Community Name"] = title;
    this["Description"] = description;
    this["Banner"] = imageAsset;
    this["Moderators"] = [createdBy];
    this["Members"] = [];
    this["Banned Users"] = [];
    this["Rules"] = null;
    this["Banner Public Id"]=bannerPublicId
  }
}
export { CommunityModel };
