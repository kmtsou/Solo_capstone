from app.models import db, communityFollows

def seed_community_follows():
    pass

def undo_community_follows():
    db.session.execute('TRUNCATE communityfollows RESTART IDENTITY CASCADE;')
    db.session.commit()
