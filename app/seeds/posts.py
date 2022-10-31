from app.models import db, Post

def seed_post():
    seedPost1 = Post(
        title="What's better, console or pc?",
        content="What's a better investment beefy gaming pc or the newest console?",
        community_id=1,
        poster_id=1
    )
    seedPost2 = Post(
        title='Test seed',
        content='This is a test post. Please post test comments on this post.',
        community_id=1,
        poster_id=1
    )
    seedPost3 = Post(
        title='Test seed',
        content='This is a test post. Please post test comments on this post.',
        community_id=2,
        poster_id=1
    )
    seedPost4 = Post(
        title='Test seed 3',
        content='This is a test post. Please post test comments on this post.',
        community_id=2,
        poster_id=1
    )
    seedPost5 = Post(
        title='Test post',
        content='This is a test post. Please post test comments on this post.',
        community_id=3,
        poster_id=1
    )
    seedPost6 = Post(
        title='Welcome to linkit!',
        content='This app is underconstruction, please watch your step.',
        community_id=3,
        poster_id=1
    )

    db.session.add(seedPost1)
    db.session.commit()

def undo_post():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
