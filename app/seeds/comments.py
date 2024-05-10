from app.models import db, Comment

def seed_comment():
    seedComment1 = Comment(
        post_id=1,
        commenter_id=2,
        content="",
    )
    seedComment2 = Comment(
        post_id=1,
        commenter_id=3,
        content="",
    )
    seedComment3 = Comment(
        post_id=1,
        commenter_id=4,
        content="",
    )
    seedComment4 = Comment(
        post_id=1,
        commenter_id=5,
        content="",
    )
    seedComment5 = Comment(
        post_id=1,
        commenter_id=1,
        content="",
    )
    seedComment6 = Comment(
        post_id=1,
        commenter_id=1,
        content="",
    )
    seedComment7 = Comment(
        post_id=1,
        commenter_id=2,
        content="",
    )
    seedComment8 = Comment(
        post_id=1,
        commenter_id=3,
        content="",
    )
    seedComment9 = Comment(
        post_id=1,
        commenter_id=4,
        content="",
    )
    seedComment10 = Comment(
        post_id=1,
        commenter_id=5,
        content="",
    )

    seedComment11 = Comment(
        post_id=1,
        commenter_id=2,
        content="",
    )
    seedComment12 = Comment(
        post_id=1,
        commenter_id=1,
        content="",
    )

def undo_comment():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
