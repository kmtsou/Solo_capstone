from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    commenter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))
    children = db.relationship("Comment", cascade='all, delete-orphan')

    post = db.relationship("Post", back_populates='comments')
    commenter = db.relationship("User", back_populates='comments')
    votes = db.relationship("Vote", back_populates='comment', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'commenter_id': self.commenter_id,
            'content': self.content,
            'created_at': self.created_at
        }

    def to_dict_rel(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'commenter_id': self.commenter_id,
            'content': self.content,
            'created_at': self.created_at,
            'post': self.post.to_dict(),
            'commenter': self.commenter.to_dict(),
            'votes': self.normalize_votes(),
            'voteTotal': self.vote_total()
        }

    def vote_total(self):
        return sum(vote.vote for vote in self.votes)

    def normalize_votes(self):
        NormalizedObj = {}
        array = [vote.to_dict_comment() for vote in self.votes]
        for obj in array:
            NormalizedObj[obj['id']] = obj
        return NormalizedObj
