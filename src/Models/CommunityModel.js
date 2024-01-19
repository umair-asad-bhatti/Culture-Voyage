class CommunityModel {
  constructor( imageAsset,title, description) {
    this["Community ID"] = "";
    this["Title"] = title;
    this["Description"] = description;
    this["Banner"] = imageAsset;
    this["Moderators"] = "";
    this["Members"] = "";
    this["Banned Users"] = "";
    this["Rules"] = "";
  }
}
export { CommunityModel };
