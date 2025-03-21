---
title: "The Invention of Beebo"
date: 2023-01-20T09:03:20-08:00
draft: false
searchHidden: false
description: "2D platform adventure game"
itch: https://thunder-blossom-games.itch.io/theinventionofbeebo
tags: ["c#", "unity"]
ShowToc: false
TocOpen: false
---
The project spanned for 3 months and was released by our start-up studio now known as *ThunderBlossom*. I worked in the assets programming department using Unity engine with C# .NET. I was responsible for implementing vital features.

</truncate>

<hr>

**Role:** Co-lead Asset Programmer<br>
**Duration:** 3 Months (September 2022 - January 2023)<br>
**Methodology:** Agile Scrum (Worked within iterative development cycles, contributing to regular sprints and standups)

#### **Overview:** 
This was our first publicly launched project at ThunderBlossom Studio, designed for the Itch.io platform, available on both Windows and WebGL. It’s a platformer adventure game that showcases our studio's skills and served as our introduction to the indie development scene. The project is currently being remastered for mobile platforms.

#### **Responsibilities:**
- Audio SFX and background music.
- Dynamic objects such as destrucible and hazardous stage props.
- UI and menu functionality.
- Level/scene changing and loading functions.

#### **Technologies Used:**
- Unity Engine
- C# .NET
- Git & GitHub
- HacknPlan (Kanban)

![Work breakdown structure (WBS)](https://i.imgur.com/EJc2mUR.png)

#### **Sample Code:**

This is an example of a class I created for the project. Its role is to control all SFXs globally in the worldspace.

```cs
    /// Deals with Audio instances and their corresponding AudioSource. Hooks up with AudioMixer.
    public class AudioManager : MonoBehaviour
    {
        [Serializable]
        protected class Audio
        {
            [Range(0f, 1f)]
            [SerializeField] private float _volume = 1f;

            [Range(.1f, 3f)]
            [SerializeField] private float _pitch = 1f;

            [field: SerializeField] public string Name { get; private set; }
            [field: SerializeField] public AudioClip Clip { get; private set; }
            [field: SerializeField] public bool IsLoop { get; private set; }
            [field: SerializeField] public bool HasCooldown { get; private set; }
            [field: SerializeField] public AudioSource Source { get; set; }
            [field: SerializeField] public AudioMixerGroup MixerGroup { get; private set; }

            public float Volume
            {
                get { return _volume; }
                set { _volume = value; }
            }

            public float Pitch
            {
                get { return _pitch; }
                set { _pitch = value; }
            }
        }

        private const string _volumeControl = "VolumeControl";

        private static Dictionary<string, float> AudioTimerDictionary;

        [SerializeField] private Audio[] _audioClips;

        [field: SerializeField] public AudioMixer Mixer { get; private set; }

        private void Awake()
        {
            AudioTimerDictionary = new Dictionary<string, float>();
            Initialize();
        }

        private void Initialize()
        {
            foreach (Audio audio in _audioClips)
            {
                audio.Source = gameObject.AddComponent<AudioSource>();
                audio.Source.clip = audio.Clip;
                audio.Source.outputAudioMixerGroup = audio.MixerGroup;
                audio.Source.volume = audio.Volume;
                audio.Source.pitch = audio.Pitch;
                audio.Source.loop = audio.IsLoop;

                if (audio.HasCooldown)
                {
                    AudioTimerDictionary[audio.Name] = 0f;
                }
            }
        }

        private Audio FindClip(string name)
        {
            Audio audio = Array.Find(_audioClips, clip => clip.Name == name);
            if (audio == null)
            {
                Debug.Log("Audio not found: " + name);
                return null;
            }
            return audio;
        }

        public void RandomizePitch(string name, Vector2 pitchRange)
        {
            Audio audio = FindClip(name);
            audio.Pitch = UnityEngine.Random.Range(pitchRange.x, pitchRange.y);
        }

        private void UpdateClip(Audio audio)
        {
            audio.Source.volume = audio.Volume;
            audio.Source.pitch = audio.Pitch;
            audio.Source.loop = audio.IsLoop;
        }

        #region Playback
        public void Play(string name)
        {
            Audio audio = FindClip(name);
            UpdateClip(audio);
            if (!CanPlayClip(audio)) return;
            audio.Source.Play();
        }

        public void Play(string name, float newVolume)
        {
            Audio audio = FindClip(name);
            audio.Volume= newVolume;
            UpdateClip(audio);
            if (!CanPlayClip(audio)) return;
            audio.Source.Play();
        }

        public void Play(string name, float newVolume, float newPitch)
        {
            Audio audio = FindClip(name);
            audio.Volume = newVolume;
            audio.Pitch = newPitch;
            UpdateClip(audio);
            if (!CanPlayClip(audio)) return;
            audio.Source.Play();
        }

        public void Stop(string name)
        {
            Audio audio = FindClip(name);
            audio.Source.Stop();
        }

        private static bool CanPlayClip(Audio clip)
        {
            if (AudioTimerDictionary.ContainsKey(clip.Name))
            {
                float lastTimePlayed = AudioTimerDictionary[clip.Name];

                if (lastTimePlayed + clip.Clip.length < Time.time)
                {
                    AudioTimerDictionary[clip.Name] = Time.time;
                    return true;
                }
                return false;
            }
            return true;
        }
        #endregion

        #region Mixer Control
        public void SetMixerVolume(float sliderValue)
        {
            Mixer.SetFloat(_volumeControl, Mathf.Log10(sliderValue) * 20);
        }

        public void IsMixerVolumeOn(bool isOn)
        {
            if (!isOn) Mixer.SetFloat(_volumeControl, -80);
        }
        #endregion
    }
}
```