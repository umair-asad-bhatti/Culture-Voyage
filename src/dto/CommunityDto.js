class CommunityDto {
    constructor(community) {
        this.communityName = community["Community Name"],
            this.smallDescription = community["Small Description"],
            this.communityType = community["Community Type"],
            this.communityLogoUrl = community["Community Logo URL"],
            this.createdAt = community['Created At'],
            this.createdBy = community['Created By'],
            this.members = community['Members']
    }
}
export { CommunityDto }