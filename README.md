![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2026

## Team name
Ererenderingdering

## Category
Best Marketplace App for Sitecore AI - Build something publishable. Not just a demo.

## Description
⟹ Write a clear description of your hackathon entry.  

  - Module Purpose
  - What problem was solved (if any)
    - How does this module solve it

_You can alternately paste a [link here](#docs) to a document within this repo containing the description._

## Video link
⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)

## Pre-requisites and Dependencies

⟹ Does your module rely on other Sitecore modules or frameworks?

- List any dependencies
- Or other modules that must be installed
- Or services that must be enabled/configured

_Remove this subsection if your entry does not have any prerequisites other than Sitecore_

## Installation instructions

### Build and run Locally

1. Clone the repository
1. Open terminal
1. Navigate to the `./src/ide/` folder
1. Run `npm install` to install the dependencies
1. Run `npm run build` to build the module
1. Run `npm run start` to create run Sitecore Marketplace module
1. Access the module at `http://localhost:3000` in your browser. You should be redirected to documentation page if the module is running correctly.
1. Alternatively, this module is hosted on Netlify and can be accessed at [https://sitecore-hackathon-2026.netlify.app/](https://sitecore-hackathon-2026.netlify.app/)

### Register a "Sitecore JavaScript Extensions" app in SitecoreAI

1. Log in to the [Cloud Portal](https://portal.sitecorecloud.io/).
1. On the navigation header, click App studio > Studio > Create app.
1. In the Create app modal, in the App name field, enter "Sitecore JavaScript Extensions"
1. Select Custom as the type of your app.
1. Click Create. A new app is registered and ready to be configured.

### Configure and activate "Sitecore JavaScript Extensions" app

1. Enable "Standalone" and "Full screen" extension points for the app.
1. Enable *SitecoreAI APIs* and *AI skills APIs* API access
1. Permissions *Pop-ups*, *Copy to clipboard*, and *Read from clipboard* are not required. But you will be able to write and execute your own custom JavaScript code. If you want to use any of these permissions, enable them as well.
1. Set *Deployment URL* to `http://localhost:3000`. Or `https://sitecore-hackathon-2026.netlify.app/` if you do not want to run it locally.
1. Set *App logo* to `/docs/images/logo.png`
1. Click *Activate* to activate the app.

### Install an activate "Sitecore JavaScript Extensions"

1. In the [Cloud Portal](https://portal.sitecorecloud.io/), click My apps.
1. Find "Sitecore JavaScript Extensions" in the list of your apps and click *Install*.
1. Select apps, where you want to install "Sitecore JavaScript Extensions".
1. Click *Next*
1. Review the permissions and click *Install* to install the app.

### Start "Sitecore JavaScript Extensions"

You can open "Sitecore JavaScript Extensions" from the list of your apps in the Cloud Portal.

![Apps icon](/docs/images/apps-icon.png)
![Apps list](/docs/images/apps-list.png)

### Configuration

"Sitecore JavaScript Extensions" does not require any additional configuration.

## Usage instructions
⟹ Provide documentation about your module, how do the users use your module, where are things located, what do the icons mean, are there any secret shortcuts etc.

Include screenshots where necessary. You can add images to the `./images` folder and then link to them from your documentation:

![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

You can embed images of different formats too:

![Deal With It](docs/images/deal-with-it.gif?raw=true "Deal With It")

And you can embed external images too:

![Random](https://thiscatdoesnotexist.com/)

## Comments
If you'd like to make additional comments that is important for your module entry.
