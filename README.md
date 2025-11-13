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
- create `reactivities.slnx` from `reactivities/` folder we created:
```cmd
dotnet new sln
```

#### create webapi
- create webapi: call it `API` which will create an `API` folder
- also create controllers in API controllers folder (-controllers)
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
dotnet new classlib - Application
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
- Running the project: from 'API/' folder
```
dotnet run
```