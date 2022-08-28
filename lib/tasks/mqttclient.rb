# class MqttClient
#   def initialize

#   end

#   def call
#     Thread.new do
#       mainUser = User.first

#       client = MQTT::Client.connect("mqtts://mqtt.hsl.fi:8883/")

#       client.subscribe("/hfp/v2/journey/ongoing/vp/#")
#       pp "connected to HSL"

#       client.get do |_topic, message|

#         vehicleData = JSON.parse(message)["VP"];

#         veh = Vehicle.find_by(external_id: vehicleData["veh"])

#         if veh
#           veh.update(lat: vehicleData["lat"], long: vehicleData["long"])
#         else
#           mainUser.vehicles.create(external_id: vehicleData, lat: vehicleData["lat"], long: vehicleData["long"])
#         end
#       end

#     end
#   end
# end
