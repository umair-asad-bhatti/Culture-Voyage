class CommunityModel {
  constructor( logo,title, description,createdBy,logoPublicID) {
    this["Created By"]=createdBy
    this["Created At"]=new Date() //change format
    this["Community ID"] = null;
    this["Community Name"] = title;
    this["Description"] = description;
    this["Community Logo URL"]=logo
    this["Banner URL"] = null;
    this["Moderators"] = [createdBy];
    this["Members"] = [];
    this["Banned Users"] = [];
    this["Rules"] = null;
    this["Banner Public Id"]=null
    this["Logo Public Id"]=logoPublicID
    this['Tags']=[]
    this['Community Type']=null
  }
}
export { CommunityModel };
