import {World} from "fivem-js";

const networkSelfId = NetworkGetPlayerIndex(PlayerId())
const hash = GetHashKey("a_f_m_fatcult_01")
console.log("FatPeople started")
console.log(hash)

setTick(fatterTick)
setTick(keepModelLoaded)

RequestModel(hash)

function keepModelLoaded(){
  SetVehicleDensityMultiplierThisFrame(1)
  SetRandomVehicleDensityMultiplierThisFrame(1)
  if(!HasModelLoaded(hash)){
    Wait(500)
    RequestModel(hash)
  }
}
function fatterTick() {
  World.getAllPeds().forEach((ped) => {
    if (!ped.IsPlayer) {
      if (ped.Model.Hash != hash) {
        if (ped.isInAnyVehicle()) {
          const veh = ped.CurrentVehicle.Handle;
          ped.delete()
          const generated = CreatePedInsideVehicle(veh, 0, hash, -1, true, true)
          SetDriverAbility(generated, 1)
          SetDriverAggressiveness(generated, 1)
          SetDriverRacingModifier(generated, 1)
          TaskVehicleDriveWander(generated, veh, 9999, 787212)
          SetDriveTaskDrivingStyle(generated, 787212)
          SetVehicleMaxSpeed(veh, 9999999)
          SetPedKeepTask(generated, true)
          SetPedAsNoLongerNeeded(generated)
          SetVehicleAsNoLongerNeeded(veh)
        } else {
          const pos = ped.Position;
          const heading = ped.Heading;
          ped.delete()
          const generated = CreatePed(0, hash, pos.x, pos.y, pos.z, heading, true, false);
          TaskWanderStandard(generated, 10, 10)
          SetPedAsNoLongerNeeded(generated)
        }
      }
    }
  })
}
