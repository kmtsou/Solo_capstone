from .db import db
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    content = db.Column(db.Text)
    # imageContent = db.Column(db.String)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    poster_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    poster = db.relationship("User", back_populates='posts')
    community = db.relationship("Community", back_populates='posts')
    comments = db.relationship("Comment", back_populates='post', cascade='all, delete')

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
            'community': self.community.to_dict()
        }
