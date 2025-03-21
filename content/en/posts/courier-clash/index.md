---
title: "Courier Clash"
date: 2023-05-20T09:03:20-08:00
draft: false
searchHidden: false
itch: "https://thunder-blossom-games.itch.io/courier-clash"
description: "3D combat-action vehicle game"
cover:
    linkFullImages: false
tags: ["c#", "unity"]
ShowToc: false
TocOpen: false
---
This was the second project I delivered with *ThunderBlossom* Studios. This time with a larger team of over 25 developers.
I worked in the gameplay programming department using C# .NET for Unity. 

</truncate>

<hr>

**Role:** Gameplay Programmer<br>
**Duration:** 3 Months in Alpha (February 2023 - May 2023)<br>
**Methodology:** Agile Scrum (Worked within iterative development cycles, contributing to regular sprints and standups)

#### **Overview:** 
For our second studio project, we decided to launch on Itch.io as a way to build momentum and generate traction for Steam Greenlight. We expanded our team in January with new artists and programmers, hence our choice to develop our first 3D action title. We worked as a partially remote studio, with some art departments being fully outsourced - in total, a team of 25 developers. In my department I worked with 4 other Gameplay programmers.

#### **Responsibilities:**
- The player character controller.
- Game stage hazards and dynamic objects.
- Driving mechanics such as fuel and drifting.
- Equipment such as shooting weapons.
- Networking and local multiplayer functions.

#### **Technologies Used:**
- Unity Engine
- C# .NET
- Git & GitLab
- Fish-Networking for multiplayer features.
- HacknPlan (Kanban)

#### **Sample Code:**

This is a fundemental class I created for the project. Its role is to control player functions, such as living/death events and object management. 
```cs
public class ControllerGamePlayer : GamePlayer
{
    [SerializeField] private ArcadeCarController carController;
    [SerializeField] private PlayerWeaponController weaponController;
    [SerializeField] private GameObject deathCam;

    // Truncated for demo...

    public override void ActivatePlayer()
    {
        carController.enabled = true;
        weaponController.enabled = true;
        base.ActivatePlayer();
    }

    public void SetUpPakageTracker()
    {
        PackageTracker.Instance?.SetCarPakageSystem(gameObject);
    }

    public void OnHealthChanged(float normalisedValue)
    {
        GameMenu.GetInstance()?.SetHealthView(normalisedValue);
    }

    public override void HandleDeath(HealthSystem healthSystem)
    {
        base.HandleDeath(healthSystem);
        deathCam.SetActive(true);
    }

    public override void Respawn(HealthSystem healthSystem)
    {
        base.Respawn(healthSystem);
        deathCam.SetActive(false);
    }

    // Truncated for demo...
}
```