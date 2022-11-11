from .db import db, environment, SCHEMA, add_prefix_for_prod
from .community import communityFollows
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    community = db.relationship("Community", back_populates="owner", cascade="all, delete")
    posts = db.relationship("Post", back_populates='poster', cascade="all, delete")
    comments = db.relationship("Comment", back_populates='commenter', cascade='all, delete')
    user_follows = db.relationship(
        "Community",
        secondary=communityFollows,
        back_populates='community_follows'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict_rel(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'community': [page.to_dict() for page in self.community]
        }
