<div class="mui-row" style="margin-top:20px;">
      <div class="mui-col-md-6 mui-col-md-offset-3">
       <div class="mui-panel">        
       <form ng-submit = "book.submit()" name="bookingForm" id="bookingForm" class="horizontal-form">
            <div class="row">
                <label >Select a vehicle</label>
                <div class="mui-select">
                <select id="vehicle" ng-model = "book.v_id"  >
                    <option value="" disabled selected>Choose your option</option>
                     <option ng-repeat="result in book.vehicles" value="{{ result.id }}">{{result.brand}}-{{result.name}}</option>
               </select>
            </div>
            </div>
            <div class="row">
                
                <label >Select a vendor:</label>
                 <div class="mui-select">
                <select  ng-model = "book.ven_id" ng-options="result.id as result.name for result in book.vendors"   ng-change = "book.slotsmatter()"  class = "ui dropdown" required>
                </select>
            </div>
            </div>
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
                <label >Select Problem :</label>
                    <div class="mui-select">
                <select  ng-model = "book.p_id"  class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.problems" value="{{ result.id }}">{{result.name}}</option>
                </select>
            </div>
            </div>
            <div class="row">
                <label >Select a date: </label>
                    <div class="mui-select">             
                 <select  ng-model = "book.date"  class = "ui dropdown" required>
                   <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.alldates" value="{{ result }}">{{result}}</option>
                </select>
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
                <label >Flat No. : </label>
                <div class="mui-textfield mui-textfield--float-label">
                <input  ng-model="book.da1"  type="text"  name="Drop address line 1"  required></br>
                </div>
                <label >Street Name: </label>
                <div class="mui-textfield mui-textfield--float-label">
                <input  ng-model="book.da2"  type="text"  name="Drop address line 2"  required></br>
                </div>
                <label >Landmark: </label>
                <div class="mui-textfield mui-textfield--float-label">
            <input  ng-model="book.da3"  type="text"  name="Drop address line 3"  required></br>
                </div>
                <label >City: </label>
            <div class="mui-textfield mui-textfield--float-label">
                  <input  ng-model="book.da4"  type="text"  name="Drop address line 4"  required></br>
            </div>    
            </div>

            <div class="row">
<label >Drop Address:  </label></br>
                <label >Flat No. : </label>
                <div class="mui-textfield mui-textfield--float-label">
                <input  ng-model="book.pa1"  type="text"  name="Pickup address line 1"  required></br>
                </div>
                <label >Street Name: </label>
                <div class="mui-textfield mui-textfield--float-label">
                <input  ng-model="book.pa2"  type="text"  name="Pickup address line 2"  required></br>
                </div>
                <label >Landmark: </label>
                <div class="mui-textfield mui-textfield--float-label">
                <input  ng-model="book.pa3"  type="text"  name="Pickup address line 3"  required></br>
                </div>
                <label >City: </label>
                <div class="mui-textfield mui-textfield--float-label">
                  <input  ng-model="book.pa4"  type="text"  name="Pickup address line 4"  required></br>
                </div>    
            </div>
                                      
    
 <div class=" col s12">
               <button class="mui-btn mui-btn--raised" type="submit" name="action">Book Now
                <i class="material-icons">send</i>
                </button>
           </div>
       </form>

{{ book .message }} 
    </div>
     <a href="#/dashboard"><button class="mui-btn mui-btn--raised">Go Back!!</button></a>
    </div>
    </div>
