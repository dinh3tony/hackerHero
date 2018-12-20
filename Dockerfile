FROM ruby:2.3.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /hackerhero
WORKDIR /hackerhero

ADD Gemfile /hackerhero/Gemfile
ADD Gemfile.lock /hackerhero/Gemfile.lock

RUN bundle install

ADD . /hackerhero
