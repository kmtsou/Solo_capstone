from .db import db, environment, SCHEMA, add_prefix_for_prod

communityFollows = db.Table(
    'communityFollows',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('communities', db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), primary_key=True)
)
if environment == "production":
    communityFollows.schema = SCHEMA

class Community(db.Model):
    __tablename__ = "communities"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(21), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship("User", back_populates="community")
    posts = db.relationship("Post", back_populates='community', cascade="all, delete")
    community_follows = db.relationship(
        "User",
        secondary=communityFollows,
        back_populates='user_follows'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'owner_id': self.owner_id
        }

    def to_dict_rel(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'owner_id': self.owner_id,
            'owner': self.owner.to_dict(),
            'posts': [p.to_dict() for p in self.posts]
        }
