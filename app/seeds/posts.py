from app.models import db, Post

def seed_post():
    seedPost1 = Post(
        title="What's better, console or pc?",
        content="What's a better investment, beefy gaming pc or the newest console?",
        community_id=1,
        poster_id=1
    )
    seedPost2 = Post(
        title='What game gets you in the fall mood?',
        content="I'm having a bit of a time trying to find something to get into right now and I always appreciate games that make me appreciate the season I'm in.",
        community_id=1,
        poster_id=1
    )
    seedPost3 = Post(
        title='How do I make an api request before a component renders in react js i.e for the very first time before the page load??',
        content='I want to display some data on the frontend. So I want to make an api request to fetch that data from database but this request should be made even before the page loads or any functional component of that page renders. I tried using useEffect and UseLayoutEffect but its not working. Can someone help?',
        community_id=2,
        poster_id=1
    )
    seedPost4 = Post(
        title='How do you avoid duplicate code in css',
        content="I'm currently building my first react project using next js and scss modules, no problems so far but I found myself writing so much duplicate code in my scss files, I thought about using scss mixins then I thought again that maybe there's a better way. So what are the best practices to avoid duplicate code when writing scss or vanilla css and how do you avoid that in your react projects?",
        community_id=2,
        poster_id=2
    )
    seedPost5 = Post(
        title='Welcome to linkit!',
        content='This app is underconstruction, please watch your step.',
        community_id=3,
        poster_id=1
    )
    seedPost6 = Post(
        title='Test post',
        content='This is a test post. Please post test comments if they have been implemented yet on this post.',
        community_id=3,
        poster_id=1
    )
    seedPost7 = Post(
        title='Project Ideas With React on Frontend and Flask on Backend',
        content="Hi guys, I'm taking a bootcamp and for the last project, we were assigned to create an app using React on the frontend and Flask on the backend. I'd love some project idea suggestions (for beginners, nothing overly complicated please).",
        community_id=2,
        poster_id=3
    )
    seedPost8 = Post(
        title='Easy to take care of dogs',
        content='Aspiring pet owner here, what are some breeds of dog that are easiest to take care of? Which ones fair well in a city or suburb?',
        community_id=4,
        poster_id=1
    )
    seedPost9 = Post(
        title='Tail wagging in sleep',
        content='My perfect boy has been wagging his tail while napping today. Does it get any better than knowing your dog is so happy he wags his tail in his sleep? No, no it does not :)',
        community_id=4,
        poster_id=2
    )
    seedPost10 = Post(
        title='my cat wakes me up to knead 5-6 times a night',
        content="my cat just recently started waking me up every single night. he's biting the blanket and kneading my legs with his front and back legs. it's for like 30 minutes at a time and it's extremely annoying. he's around 3 and he has just started doing this, he has absolutely never done this before. he's healthy and the vet doesn't think it's an issue but it's so irritating. does anyone know why he might be doing this or how i can get him to stop?",
        community_id=5,
        poster_id=3
    )
    seedPost11 = Post(
        title="Why does my foster cat dig at everything?",
        content="I'm about two weeks in to a foster-to-adopt with two sweet kitties. one of them loves to dig at things: cabinet doors, picture frames, walls, and her favorite is the top of my nightstand. there is no food nearby where she does this and she wakes me up in the middle of the night with her digging on my night stand. what's with this?",
        community_id=5,
        poster_id=4
    )
    seedPost12 = Post(
        title='Toy launchers/pet nerf guns',
        content='My cat goes crazy for fetch-type games. All the "launchers" / nerf guns on Amazon are for dog tennis balls. Any suggestions for small indoor cat toy launchers?',
        community_id=5,
        poster_id=5
    )
    seedPost13 = Post(
        title="[BotW] Is there anything you CANT'T do after beating Ganon in Breath of the Wild",
        content='I want to know if i can do all the wandering and sidequests I want after beating the main quest. If i want that should I put off the mainquest and leave it for the very last? thanks in advance :)',
        community_id=6,
        poster_id=4
    )
    seedPost14 = Post(
        title='[SS] What happens to Skyward Strikes on Hero Mode?',
        content="So just started my new Hero Mode playthrough and I've noticed that Skyward Strikes are already fully upgraded. What happens when I reach the part of the game where they normally upgrade?",
        community_id=6,
        poster_id=5
    )
    seedPost15 = Post(
        title='Water Purification Question',
        content="I'm curious how many of you use water purification tablets like aqua tabs or iodine drops to purify your water while backpacking/hiking. I've used them a few times, but always found that I disliked the taste of the water afterwards. Do any of you put tang, hydration mix, or anything else in your water after you purify it to make it taste better? Or does anyone have and suggestions as to how to make the purified water taste better?",
        community_id=7,
        poster_id=1
    )


    db.session.add(seedPost1)
    db.session.add(seedPost2)
    db.session.add(seedPost3)
    db.session.add(seedPost4)
    db.session.add(seedPost5)
    db.session.add(seedPost6)
    db.session.add(seedPost7)
    db.session.add(seedPost8)
    db.session.add(seedPost9)
    db.session.add(seedPost10)
    db.session.add(seedPost11)
    db.session.add(seedPost12)
    db.session.add(seedPost13)
    db.session.add(seedPost14)
    db.session.add(seedPost15)
    db.session.commit()

def undo_post():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
