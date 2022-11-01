from app.models import db, Community

def seed_community():
    gaming = Community(
        name='gaming',
        description='A community for all things gaming related',
        owner_id=1
    )
    react = Community(
        name='react',
        description='A community dedicated to all things react!',
        owner_id=1
    )
    linkit = Community(
        name='linkit',
        description='Welcome to linkit! Leave posts about what could be improved!',
        owner_id=1
    )

    db.session.add(gaming)
    db.session.add(react)
    db.session.add(linkit)
    db.session.commit()

def undo_community():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
