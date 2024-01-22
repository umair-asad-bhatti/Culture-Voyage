import {formatDate} from "../utils/index.js";

class CommunityModel {
  constructor( logo,title, description,createdBy,logoPublicID,communityType) {
    this["Created By"]=createdBy
    this["Created At"]=formatDate(new Date()) //change format
    this["Community ID"] = '';
    this["Community Name"] = title;
    this["Small Description"] = description;
    this["Community Logo URL"]=logo
    this["Banner URL"] = '';
    this["Moderators"] = [createdBy];
    this["Members"] = [];
    this["Banned Users"] = [];
    this["Rules"] = "";//doc id of Rules collection
    this["Banner Public ID"]=''
    this["Logo Public Id"]=logoPublicID
    this['Tags']=[]
    this['Community Type']=communityType
    this["Guidelines"]=''
  }
}
export { CommunityModel };
