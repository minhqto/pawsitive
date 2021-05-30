# Pull down an image from Docker Hub that includes the .NET core SDK: 
# This is so we have all the tools necessary to compile the app.
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

# Fetch and install Node 14. Make sure to include the --yes parameter 
# to automatically accept prompts during install, or it'll fail.
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

# Copy the source from your machine onto the container.
WORKDIR /src
COPY . .

# Install dependencies. 
RUN dotnet restore "./pawsitive.csproj"

# Compile, then pack the compiled app and dependencies into a deployable unit.
RUN dotnet publish "pawsitive.csproj" -c Release -o /app/publish

# Pull down an image from Docker Hub that includes only the ASP.NET core runtime:
# We don't need the SDK anymore, so this will produce a lighter-weight image
# that can still run the app.
FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim

# Expose port 80 to your local machine so you can access the app.
EXPOSE 80

# Copy the published app to this new runtime-only container.
COPY --from=build /app/publish .

# To run the app, run `pawsitive.dll`, which we just copied over.
ENTRYPOINT ["dotnet", "pawsitive.dll"]
