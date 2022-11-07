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
    dogs = Community(
        name='dogs',
        description='This community is a place for dog owners of all levels of knowledge, skill, and experience to discuss all topics related to dogs. Advice on this forum is not a substitute for advice from a trained and credentialed professional.',
        owner_id=2
    )
    cats = Community(
        name='cats',
        description='Community for questions, articles and stories featuring or about cats',
        owner_id=3
    )
    zelda = Community(
        name='zelda',
        description='This is the unofficial hub for anything and everything The Legend of Zelda - the iconic Nintendo series. Feel free to share news, reviews, opinions, humour, or anything else Zelda. For fans, by fans.',
        owner_id=1
    )
    hiking = Community(
        name='hiking',
        description="The hiker's community",
        owner_id=4
    )

    db.session.add(gaming)
    db.session.add(react)
    db.session.add(linkit)
    db.session.add(dogs)
    db.session.add(cats)
    db.session.add(zelda)
    db.session.add(hiking)
    db.session.commit()

def undo_community():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
