    <div class="mui-row" style="margin-top:20px;">
      <div class="mui-col-md-6 mui-col-md-offset-3">
       <div class="mui-panel">        
       <form ng-submit = "book.submit()" name="bookingForm" id="bookingForm" class="horizontal-form">
        <div style="margin:5%;">
            <div class="row">
                <label >Select a Problem type</label>
                    <div class="mui-select">
                <select ng-model = "book.t_id"  class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.b_types" value="{{ result.id }}">{{result.name}}</option>
                </select>
            </div>
            </div>
            <div class="row">
                <label >Enter the Location:</label>&nbsp;<button ng-model="book.locations" class="mui-btn mui-btn--raised" onclick="getLocation1()"  ng-click = "book.ven_lat_long()"><i style="margin-top:25%;" class="material-icons">location_on</i></button>
                <div class="mui-textfield mui-textfield--float-label">
                <input  ng-model="book.locations"  ng-change = "book.ven_locations()" type="text"  name="Location"  ></br>
                </div>
            </div>

            <div class="row">
                <label >Select a vehicle</label>
                <div class="mui-select">
                <select id="vehicle" ng-model = "book.v_id"  >
                <option value="" disabled selected>Choose your option</option>
                <option ng-repeat="result in book.vehicles" value="{{ result.id }}">{{result.brand}}-{{result.name}}
                </option>
               </select>
            </div>
            </div>


        <div ng-hide = "book.vendor_value">
            <div class="row">
                
                <label >Select a vendor:</label>
                 <div class="mui-select">
                <select  ng-model = "book.ven_id" ng-options="result.id as result.name for result in book.vendors" 
                  ng-change = "book.slotsmatter()"  class = "ui dropdown" required>
                </select>
            </div>
            </div>
        </div>
        <div ng-hide = "book.problem_specific">
            <div class="row">
                <label >Select Problem :</label>
                    <div class="mui-select">
                <select  ng-model = "book.p_id"  class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.problems" value="{{ result.id }}">{{result.name}}</option>
                </select>
            </div>
            </div>
        </div>
        <div ng-hide = "book.remaining_body">
            <div class="row">
                <label >Select a date: </label>
                    <div class="mui-select">             
<!--            <select  ng-model = "book.date"  class = "ui dropdown" required>
                   <option value="" disabled selected>Choose your option</option>
                   <option ng-repeat="result in book.alldates" value="{{ result }}">{{result}}</option>
                </select> -->
                <time-date-picker autosave theme="bootstrap" orientation="false" ng-model="book.date" ng-change = "book.slotsmatter()" weekdays="['M','T','W','T','F','S']"></time-date-picker>
            </div>
            </div>
            <div class="row">
                <label >Select a slot: </label>
                <div class="mui-select">             
                <select  ng-model = "book.slot" class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.slots" value="{{ result }}">{{result}}</option>
                </select>
            </div>

            </div>
             
           <div class="row">
                <label >Pickup Address:  </label></br>
                <textarea ng-model = "book.paddr" row = "5" column = "40" required></textarea>                
            </div>

            <div class="row">
                <label >Drop Address:  </label><!-- &nbsp;<button class="mui-btn mui-btn--raised" onclick="getLocation2()"><i style="margin-top:25%;" class="material-icons">location_on</i></button></br> -->
                </br>
                <textarea ng-model = "book.daddr" row = "5" column = "40" required></textarea>    
            </div>
        </div>                                   
    
            <div class=" col s12">
               <button class="mui-btn mui-btn--primary" type="submit" name="action">Book Now
                <i class="material-icons">send</i>
                </button>&nbsp; &nbsp;
                <a href="#/dashboard"><button class="mui-btn mui-btn--danger">Back</button></a>
           </div>
        </div>
       </form>
{{ book .message }} 
    </div>
    </div>
    </div>
    