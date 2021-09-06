## About This Project

**Hello Tutorials** is a shop / tutorials app built with Next.js / React.js and Keystone.js / Express.js.

## Hello Tutorials - Front End Stuff

### Built With

- [Next.js](https://nextjs.org/) (React.js framework)
- [Stripe](https://stripe.com)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Styled Components](https://styled-components.com/)

**Some features**:

- Users can sign up, log in, purchase tutorials, and then read the tutorials that they've purchased. They can, in theory also reset their password, but this is still in demo mode so is not an IRL thing.

## Have a loooook

Client: [https://www.hellotutorials.dev](https://www.hellotutorials.dev)
But, please don't buy things because I don't think that's at all legal | ◯ ‸ ◯ |

## Getting Started

To get a local copy up and running follow these steps for the front end, and the steps in the [README](https://github.com/hisamparker/hello-server.git) for the backend.

### Prerequisites

- A recent<i>ish</i> version of Node 
- A computer 
- A custom domain: For users to sign up, log in, view their purchased tutorials, we need authentication. The Keystone / GraphQL server for this project uses sessions for authentication (in the form of cookies and JWT tokens). 

In production, the cookies won't be passed unless the client (Next.js application) shares the same root domain as the server because of current browser restrictions / SameSite origins policies. (please see the netlify.toml file in the root of the project for additional deployment settings.)

For example, the server will be on api.example.com and the client will be on www.example.com.

The version of Keystone.js (Next) used by this project not allow the developer to set SameSite=none ლ(ಥ Д ಥ )ლ 

The documentation for Keystone 6 implies that you can set SameSite=none with the current version of Keystone, but I'll believe it when I see it.

### Installation
#### You'll need to set up the server as well, to do so, see the steps in the server [README](https://github.com/hisamparker/hello-server.git)

1. Clone the repo

   ```sh
   $ git clone https://github.com/hisamparker/hello-client.git
   ```

2. Install NPM packages :  You will get a lot of warnings, these packages are old. I would not build anything based on this stack moving forward. Everything here has been outdate since like, August 2021 ⊂(▀¯▀⊂)

   ```sh
   $ npm i
   ```
3. Create configuration file for the frontend (`client/.env.local`), see [`client/sample.env`](/.env.production). Notice, you need to set up Stripe and provide a key!

4. Change the config file to match your own end points (for development, you can probs just leave it how it is)

## Usage

```sh
$ npm run dev
```

Go to [http://localhost:7777](http://localhost:7777) for the Next.js application (frontend). Remember, it's not going to have any data unles you've got the backend up and running!

## Deployment

I deployed the front end to netlify, although vercel would also be an excellent choice. Probably a better choice.

You'll need the netlify.toml file to prevent cors issues, I've included a vercel.json file too in case you go with vercel ᕙ⁞ = 〰 = ⁞ᕗ

Remember to update the config file with your correct endpoint (URL). Let netlify access your Githup repo and poof, app. But...

You won't be able to log in, sign up, etc... without a custom domain and that part is a pain in the tits.

My custom domain is a Google domain. You must set up the correct [resource records] (https://support.google.com/domains/answer/3251147?hl=en) for your domain. In netlify, follow the steps to add a custom domain laid out in their docs (this type of stuff changes all the time, so I'm not going to give exact steps, you can always email me for help!) You'll need a  0 issue "letsencrypt.org" cert and a 0 issue "digicert.com" (backend)   

## Playlist

I like music when coding - [hello client playlist](https://open.spotify.com/playlist/6COOwTUqfykZ1jjbPzyDQE?si=97aa3c684def49ff)

## Acknowledgements

- Martin Toledo ╰(✿˙ᗜ˙)੭━☆ﾟ.*･｡ﾟ I could not have figured out my toml and yaml without your help and also you are the best and so fun and so cool
- Leif Parker (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ I could not have figured out custom domain things without your super annoying help you are myy best friend ever and also v annoying and also v cool
- Yong Lee (✿ ◕ᗜ◕)━♫.*･｡ﾟ Who also helped me figure out deployment and that I needed a digicert, which I really really did and who I don't actually know ver well, but seems very kind and thoughtful