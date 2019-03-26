# Coding4Kids IDE

This is an online platform to be used for coding workshops for kids. The kids get to know the basics of the web technologies and can create their own projects, e.g., browser games and a personal homepage. The main focus is simple usage. The kids can work in teams, the platform offers the possibility for many writers to work on the same file. This online platform is meant to be used in privately organized workshops as well as in schools. 

## Installation

The Coding4Kids IDE is based on [Meteor](https://www.meteor.com/). For a local installation, just install Meteor on Linux or OS X by

```
curl https://install.meteor.com/ | sh
```

See https://www.meteor.com/install for other operating systems.

Afterwards, download this repository using git

```
git clone https://github.com/Coding4KidsAT/coding4kids-ide.git
```

Enter the directory by

```
cd coding4kids-ide
```

Install the dependencies by

```
meteor npm install
```

And start the application:

```
meteor --settings settings.json
```

## License

MIT