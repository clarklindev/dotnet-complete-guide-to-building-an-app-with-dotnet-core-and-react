# Udemy - Complete guide to building an app with .Net Core and React

## 01. Introduction

### Setting up the developer environment

- download .net: https://dotnet.microsoft.com/en-us/

### Adding VS Code extensions

- C# dev kit

- package manager: NuGet Gallery

- SQLite Viewer

### Course assets and source code
- github.com/TryCatchLearn/reactivities
- `git log --all --decorate --oneline --graph`
- `git config --global alias.adog "log --all --decorate --oneline --graph"`
- `git adog`

---

## 02. Building a walking skeleton Part 1 - .Net API

### introduction
- walking skeleton is a tiny implementation of the system that performs a small end-to-end function
- learning goals:
    - creating .net projects
    - project architecture
    - dotnet CLI
    - .Net project files
    - running the .net application
    - entity framework (object relational mapper providing connection for db - maps c# code into sql queries)
    - seeding data
    - code first migrations
    - postman
    - git for source control

### Creating the .Net projects

```
dotnet --info
```

- listing templates can create using dotnet cmd
```
dotnet new list
```

```
These templates matched your input: 

Template Name                                 Short Name                    Language    Tags
--------------------------------------------  ----------------------------  ----------  ----------------------------------
API Controller                                apicontroller                 [C#]        Web/ASP.NET
ASP.NET Core Empty                            web                           [C#],F#     Web/Empty
ASP.NET Core gRPC Service                     grpc                          [C#]        Web/gRPC/API/Service
ASP.NET Core Web API                          webapi                        [C#],F#     Web/Web API/API/Service
ASP.NET Core Web API (native AOT)             webapiaot                     [C#]        Web/Web API/API/Service
ASP.NET Core Web App (Model-View-Controller)  mvc                           [C#],F#     Web/MVC
ASP.NET Core Web App (Razor Pages)            webapp,razor                  [C#]        Web/MVC/Razor Pages
Blazor Web App                                blazor                        [C#]        Web/Blazor/WebAssembly
Blazor WebAssembly Standalone App             blazorwasm                    [C#]        Web/Blazor/WebAssembly/PWA
Class Library                                 classlib                      [C#],F#,VB  Common/Library
Console App                                   console                       [C#],F#,VB  Common/Console
dotnet gitattributes file                     gitattributes,.gitattributes              Config
dotnet gitignore file                         gitignore,.gitignore                      Config
Dotnet local tool manifest file               tool-manifest                             Config
EditorConfig file                             editorconfig,.editorconfig                Config
global.json file                              globaljson,global.json                    Config
MSBuild Directory.Build.props file            buildprops                                MSBuild/props
MSBuild Directory.Build.targets file          buildtargets                              MSBuild/props
MSBuild Directory.Packages.props file         packagesprops                             MSBuild/packages/props/CPM
MSTest Playwright Test Project                mstest-playwright             [C#]        Test/MSTest/Playwright/Desktop/Web
MSTest Test Class                             mstest-class                  [C#],F#,VB  Test/MSTest
MSTest Test Project                           mstest                        [C#],F#,VB  Test/MSTest/Desktop/Web
MVC Controller                                mvccontroller                 [C#]        Web/ASP.NET
MVC ViewImports                               viewimports                   [C#]        Web/ASP.NET
MVC ViewStart                                 viewstart                     [C#]        Web/ASP.NET
NuGet Config                                  nugetconfig,nuget.config                  Config
NUnit Playwright Test Project                 nunit-playwright              [C#]        Test/NUnit/Playwright/Desktop/Web
NUnit Test Item                               nunit-test                    [C#],F#,VB  Test/NUnit
NUnit Test Project                            nunit                         [C#],F#,VB  Test/NUnit/Desktop/Web
Protocol Buffer File                          proto                                     Web/gRPC
Razor Class Library                           razorclasslib                 [C#]        Web/Razor/Library
Razor Component                               razorcomponent                [C#]        Web/ASP.NET
Razor Page                                    page                          [C#]        Web/ASP.NET
Razor View                                    view                          [C#]        Web/ASP.NET
Solution File                                 sln,solution                              Solution
Web Config                                    webconfig                                 Config
Windows Forms App                             winforms                      [C#],VB     Common/WinForms
Windows Forms Class Library                   winformslib                   [C#],VB     Common/WinForms
Windows Forms Control Library                 winformscontrollib            [C#],VB     Common/WinForms
Worker Service                                worker                        [C#],F#     Common/Worker/Web
WPF Application                               wpf                           [C#],VB     Common/WPF
WPF Class Library                             wpflib                        [C#],VB     Common/WPF
WPF Custom Control Library                    wpfcustomcontrollib           [C#],VB     Common/WPF
WPF User Control Library                      wpfusercontrollib             [C#],VB     Common/WPF
xUnit Test Project                            xunit                         [C#],F#,VB  Test/xUnit/Desktop/Web
```

- we will use
    - ASP.NET Core Web API                          webapi   
    - Solution File                                 sln,solution                              Solution
    - Class Library                                 classlib                      [C#],F#,VB  Common/Library

#### create solution file
- create a solution file `reactivities.slnx` from inside `Reactivities/` folder:
- a solution file is just a container for all our different projects
```cmd
dotnet new sln
```

#### create webapi
- create webapi template: call it `API` which will create an `API` folder
- the default way of creating a webapi nowadays is to use the minimal api type of configuration (too clutterd for what we will be doing)
- so we will be creating api controllers in API controllers folder (-controllers)
```
dotnet new webapi -n API -controllers
```

#### create classlib libraries
- create a classlib called Domain
```
dotnet new classlib -n Domain
```

- create one for application layer
```
dotnet new classlib -n Application
```

- create one for persistence
```
dotnet new classlib -n Persistence
```

#### add projects into the solution
```
dotnet sln add API
dotnet sln add Application
dotnet sln add Domain
dotnet sln add Persistence
```

### goto vscode -> solution explorer view
- in vscode you have on left: "solution explorer view"

#### API references
- solution explorer: need to add reference going from API to Application 
    - rightclick on API -> add project reference -> select `Application`
- select `API` -> you will see a project reference
    
```csproj
<ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
</ItemGroup>
```

#### Application references
- solution explorer: Application needs reference to `Domain` and `Persistence` (see above)

#### Domain references
- none

#### Persistence references
- solution explorer: Persistence needs references to `Domain`

---

### Reviewing whats in the projects
- Running the project: from '/reactivities/API' folder: uses Program.cs
- http://localhost:5062
- note: instead of dotnet run can use `dotnet watch`
```
dotnet run
```

- has no view, just API endpoints eg. (see API/Controllers/WeatherForecastController.cs)
- the route is `WeatherForecastController` without the 'Controller' keyword
- http://localhost:5062/WeatherForecast
```cs
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
```

- look at `API/Properties/launchSettings.json`, it shows the route that app starts at 'profiles' and takes first in the list 'http' and under 'applicationUrl'
- remove the first profile `http`
- applicationUrl -> keep the https
- recommended -> use port 5001

```cs
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": false,
      "applicationUrl": "https://localhost:5001",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}

```

- restart server with `watch`
```
dotnet watch
```

- project configuration: `API.csproj` update:
```cs
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
  </ItemGroup>

</Project>

```
- delete `API/API.http` used for testing api endpoints but easier to test with POSTMAN

- Program.cs - usually has main() method but microsoft moved it so you dont see it.
    - it has services
    - http request pipeline
    - remove `builder.Services.AddOpenApi();`
    - remove:
    ```cs
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();
    ```
- `app.MapControllers();` provides the routing

### Creating a domain entity 
- solutions explorer -> `Domain` -> delete `Class1.cs`
- right-click on Domain -> new file -> Class -> name entity (model) class called 'Activity'
- entity class will relate to a table inside DB
- each property will relate to a column in table
- add a property: type 'prop' then `TAB`
- create `Id` property using `Guid.NewGuid().ToString();`

```cs
// Domain/Activity.cs
using System;

namespace Domain;

public class Activity
{
  public string Id { get; set; } = Guid.NewGuid().ToString();
  //...
}

```

- `entity` is a db model

### Creating the Entity Framework DbContext class
- DbContext class provides connection to database

- using nuget: 

#### microsoft.EnitityFrameworkCore.sqlite
- `microsoft.entityframework` search for `microsoft.EnitityFrameworkCore.sqlite`
  - NOTE: the version must match the .dotnet framework version
- once selected, you can select which project to install it into `Persistence.csproj`
- inside `Persistence/` delete `Class1.cs`

#### microsoft.EntityFrameworkCore.Design
- `microsoft.EntityFrameworkCore.Design` -> add to `API.csproj`


- rightClick - Persistence -> new file -> Class -> `AppDbContext.cs`

```cs
// AppDbContext.cs
using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Activity> Activities { get; set; }
}


```
- then inside API/ project -> Program.cs

```cs
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.MapControllers();

app.Run();

```

### Creating an Entity Framework migration

- when the app starts up it will look for the configuration
  - API/appsettings.json (for secret api keys and exclude from git repo)
  - API/appsettings.Development.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data source=reactivities.db"
  }
}

```
- make an entity framework migration
- google -> `dotnet ef nuget` -> https://www.nuget.org/packages/dotnet-ef

- from `Reactivities/API/`
```
dotnet tool install --global dotnet-ef --version 10.0.0
```

- after install in cmd -> `dotnet ef`

- the point of these migrations is entity framwork will look inside our AppDbContext.cs and sees it should create table Activities

```cs
  public required DbSet<Activity> Activities { get; set; }
```

- ef will look at `Domain/Activity.cs` properties and make decisions on what type of column it will be
- by default an `Id` property will be used as primary key for table in db
- without `Id` property, to tell Entity framework what property to use as primary key - you do it like this `[Key]`:

```cs
[Key]
public string Id {get; set;} = Guid.NewGuid().ToString();
```

#### creating the migration
- from `Reactivities/` (folder where .sln is)
- specify the project (-p) that contains the db context `Persistence`
- and the starter project (-s) `API`

```
dotnet ef migrations add InitialCreate -p Persistence -s API
```
- this creates a folder `Migrations` inside `Persistence`

#### applying the migrations
- from `Reactivities/`
```
dotnet ef database update -p Persistence -s API
```
- it creates `API/reactivities.db`

#### delete database
- delete the database, we will create it through code
```
dotnet ef database drop -p Persistence -s API
```

### Seeding data into the Database
- Solutions Explorer -> Persistence -> right-click -> new Class -> `Dbinitializer`
- we will use this to seed our data

- when using `Activity` in `Persistence/Dbinitializer.cs` -> import `using Domain` 

- in `API/Program.cs` we will use this seed data.
- we apply migration with code..

```cs
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await Dbinitializer.SeedData(context);
}
catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
```

### Creating an API Controller
- be able to query and return data from http response
- we need an API controller
- we create BaseApiController.cs
  - rightclick `API/Controllers/` -> API Controller -> name it `BaseApiController`

```cs
// BaseApiController.cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
    }
}

```
- rightclick API/Controllers/ -> new class -> `ActivitiesController`
- now inherits from `BaseApiController`
- we inject via primary constructor `AppDbContext context`
```cs
// ActivitiesController.cs

using System;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]   
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        var activity = await context.Activities.FindAsync(id);

        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }
}

```
- NOTE: its https://
- now revisiting `https://localhost:5001/api/activities` should give back a list of activities
- and https://localhost:5001/api/activities/29b6ff9e-45e6-4b1b-8d8f-5446f7aaca7f should give back one single activity

