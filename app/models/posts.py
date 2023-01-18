from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    content = db.Column(db.Text)
    # imageContent = db.Column(db.String)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    poster_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    poster = db.relationship("User", back_populates='posts')
    community = db.relationship("Community", back_populates='posts')
    comments = db.relationship("Comment", back_populates='post', cascade='all, delete')
    votes = db.relationship("Vote", back_populates='post', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'community_id': self.community_id,
            'poster_id': self.poster_id,
            'created_at': self.created_at
        }

    def to_dict_rel(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'community_id': self.community_id,
            'poster_id': self.poster_id,
            'created_at': self.created_at,
            'poster': self.poster.to_dict(),
            'community': self.community.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments],
            'votes': [vote.to_dict_post() for vote in self.votes],
            'voteTotal': self.vote_total()
        }

    def vote_total(self):
        return sum(vote.vote for vote in self.votes)
