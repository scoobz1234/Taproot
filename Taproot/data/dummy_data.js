import Resident from "../Models/Resident";
import Behaviors from "../Models/Behaviors";
import Interventions from "../Models/Interventions";
import Diagnosis from "../Models/Diagnosis";

export const DIAGNOSIS = [
  new Diagnosis("G31.84", "Cognitive Impairment (mild)"),
  new Diagnosis("G93.1", "Anoxic Brain Injury"),
  new Diagnosis("G31.09", "Frontotemporal Dementia"),
  new Diagnosis("G30.9", "Alzheimer's disease, unspecified"),
  new Diagnosis("F01", "Vascular Dementia"),
  new Diagnosis("F03", "Senile Dementia"),
  new Diagnosis("G31.83", "Dementia with Lewy bodies"),
  new Diagnosis("I10", "Essential (primary) Hypertension"),
  new Diagnosis("M13.80", "Arthritis, unspecified"),
  new Diagnosis("G12.21", "Amyotrophic Lateral Sclerosis")
];

export const RESIDENTS = [
  new Resident("2146510", "John Doe", "PCH", "12/21/1992", "Male", [
    "G31.84",
    "G31.09"
  ]),
  new Resident("1496250", "Jane Doe", "PCH", "01/01/1993", "Female", [
    "G31.83"
  ]),
  new Resident("9956428", "Mark Shark", "PCH", "02/02/1989", "Male", [
    "G30.9",
    "F03"
  ]),
  new Resident("6021448", "Carl Smith", "PCH", "03/03/1962", "Male", [
    "I10",
    "M13.80",
    "G12.21"
  ]),
  new Resident("0928986", "Robert Ouellette", "PCH", "09/28/1986", "Male", [
    "F01",
    "G31.09"
  ]),
  new Resident("1256859", "Suzanne Palmer", "PCH", "09/21/1962", "Female", [
    "G31.83"
  ]),
  new Resident("4786952", "Patty Mayonaise", "PCH", "12/21/1991", "Female", [
    "I10"
  ]),
  new Resident("4297895", "Shaun White", "PCH", "01/10/1925", "Male", [
    "I10",
    "M13.80",
    "G12.21",
    "G31.84",
    "G93.1"
  ])
];

export const BEHAVIORS = [
  new Behaviors("1", "Resisting Meals - ALL"),
  new Behaviors("2", "Resisting Meals Breakfast"),
  new Behaviors("3", "Resisting Meals Lunch"),
  new Behaviors("4", "Resisting Meals Dinner"),
  new Behaviors("5", "Playing With Food"),
  new Behaviors("6", "Throws/Pushes Food Away"),
  new Behaviors("7", "Eye Issues"),
  new Behaviors("8", "Teeth Issues")
];

export const INTERVENTIONS = [
  new Interventions(
    "1",
    ["1"],
    "Ensure all food is cut up and provide them one piece of silverware.",
    4
  ),
  new Interventions(
    "2",
    ["1", "7", "8"],
    "Do not rush. They may be frustrated with difficulties they are having.",
    3
  ),
  new Interventions(
    "3",
    ["1", "7"],
    "The environment may be too busy. Have them sit with one to two people only.",
    5
  ),
  new Interventions(
    "4",
    ["1", "2", "3", "4", "5"],
    "They may not like the food. Try a snack you know they enjoy seeing if they are hungry and not liking the food.",
    1
  ),
  new Interventions(
    "5",
    ["1"],
    "Make sure the plate is not moving as they are eating. Place a rubber mat or skid proof place mat under the plate.",
    1
  ),
  new Interventions(
    "6",
    ["2", "3", "4"],
    "Larry does not like to eat breakfast early in the morning. Attempt to give him breakfast about an hour after normal serving time.",
    5
  ),
  new Interventions(
    "7",
    ["2", "3", "4", "5", "6"],
    "Reduce other distractions and background noises during eating such as television or music.",
    3
  ),
  new Interventions(
    "8",
    ["2", "3", "4"],
    "Serve foods that he/she can eat with his/her fingers.",
    3
  ),
  new Interventions(
    "9",
    ["5", "6", "7"],
    "Provide a simple prompt, such as “please take a bite”.",
    4
  ),
  new Interventions(
    "10",
    ["5"],
    "Assess for barriers such as dirty eye glasses, problems or pain with dentures, or if they need to use the restroom which is distracting them from eating.",
    5
  ),
  new Interventions(
    "11",
    ["6", "7"],
    "Adjust portion size according to the person’s preferences.",
    2
  ),
  new Interventions(
    "12",
    ["6"],
    "Use a white dish to reduce distraction.",
    1
  ),
  new Interventions(
    "13",
    [],
    "Reduce other distractions and background noises during eating such as television or music.",
    4
  ),
  new Interventions(
    "14",
    ["8"],
    "Provide small pieces or soft food if chewing is a problem. Moisten food with gravy or sauce for an easier time to eat.",
    3
  ),
  new Interventions(
    "15",
    ["8"],
    "Be sure that he/she can chew the food. Check for sore mouth or issues with dentures.",
    5
  )
];
