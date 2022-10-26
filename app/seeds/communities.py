from app.models import db, Community

def seed_community():
    gaming = Community(
        name='gaming',
        description='A community for all things gaming related',
        owner_id=1
    )

    db.session.add(gaming)
    db.session.commit()

def undo_community():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
