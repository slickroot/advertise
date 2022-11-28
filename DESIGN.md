## How the system works
The API is written with the help of nest.js framework, it contains a bunch of modules, that will explore:

The `hooks` module is where most of the business logic happens, it exposes one endpoint `/hooks`, when it gets a request and based on the name of the event, it just uses an `EventEmitter` to process the database updates, as follows:

- POST request to `/hooks` - i.e `{ id: 'USER_MATCHES_AD', payload: { adId } }`.
- The controller gets the request and emits a corresponding event, sends back a success code.
- The event listener process the event updating the DB.

The `ads` and `users` modules are used to just get data, so you can get a user or all users, and two endpoints of `ads` are used for our business requirements:

- `/ads/read?user={id}` this endpoint is to get ads that were read by a user.
- `/ads/matched?user={id}` this endpoint is to get ads that were matched by a user.
- 
The `seeder` module is used to seed the database, that's the only way to create users and ads for the system.
So a simple empty POST to `/seed` creates 4 users and 2 ads that can be used to play with the API.

The `reports` module is the way we get reports on ads:
- `/reports/ads/:id` shows watch and read rate for an ad, so percentage of users who watched and who read the ad.
- `/reports` shows average read rate, how long users read an ad for.

Controllers are mostly using database models directly, there's no service layer, I didn't find a need for it now.
The database schema is itself super simple:
- User: {firstName, lastName, username, ads} 
- Ad: {targetingCriteria, users}
The two tables are associated using a many to many relationship, the joining table User_Ad contains some more ad properties:
- User_Ad: {user, ad, isRead, period}

The schema is created for us using `Sequelize`

#### Why was this design chosen?
Software is supposed to be soft, or easy to change, that's mostly the reason why this modular design was chosen, nestjs supports dependency injection so any module can be changed and replaced by another implementation.

#### What assumptions were made from possibly unclear requirements?
I assumed that an Ad cannot be read if it wasn't matched before.

#### What are the limitations of this design? What are the likely bottlenecks and how could they be mitigated?
The events we listen to can be lost and it won't be retried - this can be solved by using a better queue service.

#### Any alternative approaches that could be considered?
I think there's just an infinity of approaches that could be used to solve this problem.

It can be serverless, it can use Segment for events, it can use a queue, it can be microservices based, or any other way, or it can start in any way and evolve to any other way. It really depends on how users are intercating with it.

## Authentication
Authentication was replaced by a query parameter `?user={id}`, in a production environment an authentication system would be a must, auth0 or firebase are a good start.

## Testing
I did drive development using E2E tests, so the tests were written first, I didn't need to write unit tests, just because the system is simple enough. This is normally my develoment approach.
E2E tests I wrote were kind of a user story from the point of view of the mobile app, I advise you to check it out `test/app.e2e-spec.ts`

## Deployment
We do have a Dockerfile for the APP, we will to have some of our config in `.env` files in order to make deployment possible, the only thing the API needs to connect to is a DB, so I would have the database config dependent on the environment. Some kind of control flow statement that gives the APP the right config based on where it's deployed.

## API and database versioning, upgrades and migrations
API versioning is important when it's used by a mobile APP, mandatory updating the APP to the last version does not always work, at least whenever we have a new version of the API that would break the last mobile app version we should have a period of migration where the last version of the API is live too.

## Abuse
Secure authentication will play a great role of preventing abuse, also we should monitor API calls that seems to be from Bots.

## Server health metrics
Monitoring. Watch out from crashes, if we're using kubernetes we should have some kind of always restart policy to keep the API alive as much as possible, we should also track down crashes and see what's causing them then fix.

## Anything else
In my experience logging plays a huge role in fixing production problems. I would want to implement a great logging system, maybe add some IDs to requests that can follow a request from user to database and be present in all logs.

I'm personally not tied to a set of things that any app must have to be production ready, I matured enough to know that these things can change quickly and they depend on teams, systems and users.
