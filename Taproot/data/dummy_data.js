import Resident from "../Models/Resident";
import Behaviors from "../Models/Behaviors";
import Interventions from "../Models/Interventions";

export const RESIDENTS = [
  new Resident(
    "2146510",
    "John Doe",
    "PCH",
    "12/21/1992",
    "Male",
    "diagnosis 1"
  ),
  new Resident(
    "1496250",
    "Kyle OShanahan",
    "PCH",
    "01/01/1993",
    "Male",
    "diagnosis 1"
  ),
  new Resident(
    "9956428",
    "Mark Shark",
    "PCH",
    "02/02/1989",
    "Male",
    "diagnosis 1"
  ),
  new Resident(
    "6021448",
    "Carl Smith",
    "PCH",
    "03/03/1962",
    "Male",
    "diagnosis 1"
  ),
  new Resident(
    "0928986",
    "Tonald Drump",
    "PCH",
    "08/09/1956",
    "Male",
    "diagnosis 1"
  ),
  new Resident(
    "1256859",
    "Jill Valentine",
    "PCH",
    "09/21/1962",
    "Female",
    "diagnosis 1"
  ),
  new Resident(
    "4786952",
    "Sernie Banders",
    "PCH",
    "12/21/1991",
    "Male",
    "diagnosis 1"
  ),
  new Resident(
    "4297895",
    "Cillary Hlinton",
    "PCH",
    "01/10/1925",
    "Female",
    "diagnosis 1"
  )
];

export const BEHAVIORS = [
  new Behaviors("1", "Resisting Meals - ALL", ["1", "2", "3", "4", "5"]),
  new Behaviors("2", "Resisting Meals Breakfast", ["4", "6", "7", "8"]),
  new Behaviors("3", "Resisting Meals Lunch", ["4", "6", "7", "8"]),
  new Behaviors("4", "Resisting Meals Dinner", ["4", "6", "7", "8"]),
  new Behaviors("5", "Playing With Food", ["4", "9", "7", "10"]),
  new Behaviors("6", "Throws/Pushes Food Away", ["11", "12", "9", "7"]),
  new Behaviors("7", "Eye Issues", ["3", "2", "11", "9"]),
  new Behaviors("8", "Teeth Issues", ["14", "2", "15"])
];

export const INTERVENTIONS = [
  new Interventions(
    "1",
    "Ensure all food is cut up and provide them one piece of silverware."
  ),
  new Interventions(
    "2",
    "Do not rush. They may be frustrated with difficulties they are having."
  ),
  new Interventions(
    "3",
    "The environment may be too busy. Have them sit with one to two people only."
  ),
  new Interventions(
    "4",
    "They may not like the food. Try a snack you know they enjoy seeing if they are hungry and not liking the food."
  ),
  new Interventions(
    "5",
    "Make sure the plate is not moving as they are eating. Place a rubber mat or skid proof place mat under the plate."
  ),
  new Interventions(
    "6",
    "Larry does not like to eat breakfast early in the morning. Attempt to give him breakfast about an hour after normal serving time."
  ),
  new Interventions(
    "7",
    "Reduce other distractions and background noises during eating such as television or music."
  ),
  new Interventions(
    "8",
    "Serve foods that he/she can eat with his/her fingers."
  ),
  new Interventions(
    "9",
    "Provide a simple prompt, such as “please take a bite”."
  ),
  new Interventions(
    "10",
    "Assess for barriers such as dirty eye glasses, problems or pain with dentures, or if they need to use the restroom which is distracting them from eating."
  ),
  new Interventions(
    "11",
    "Adjust portion size according to the person’s preferences."
  ),
  new Interventions("12", "Use a white dish to reduce distraction."),
  new Interventions(
    "13",
    "Reduce other distractions and background noises during eating such as television or music."
  ),
  new Interventions(
    "14",
    "Provide small pieces or soft food if chewing is a problem. Moisten food with gravy or sauce for an easier time to eat."
  ),
  new Interventions(
    "15",
    "Be sure that he/she can chew the food. Check for sore mouth or issues with dentures."
  )
];
