from .db import db, environment, SCHEMA, add_prefix_for_prod

class Vote(db.Model):
    __tablename__ = 'votes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    vote = db.Column(db.SmallInteger)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))

    user = db.relationship("User", back_populates='votes')
    post = db.relationship("Post", back_populates='votes')
    comment = db.relationship("Comment", back_populates='votes')


    def to_dict(self):
        return {
            'id': self.id,
            'vote': self.vote,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_id': self.comment_id
        }

    def to_dict_post(self):
        return {
            'id': self.id,
            'vote': self.vote,
            'user_id': self.user_id,
            'post_id': self.post_id
        }

    def to_dict_comment(self):
        return {
            'id': self.id,
            'vote': self.vote,
            'user_id': self.user_id,
            'comment_id': self.comment_id
        }
