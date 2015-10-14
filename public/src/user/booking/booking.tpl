<div>
        <form ng-submit = "book.submit()" name="bookingForm" id="bookingForm" class="horizontal-form">
            <!-- <div class="row">
                <label >Select a vehicle</label>
                <select id="vehicle" ng-model = "book.v_id"  >
                    <option value="" disabled selected>Choose your option</option>
                     <option ng-repeat="result in book.vehicles" value="{{ result.id }}">{{result.brand}}-{{result.name}}</option>
                        
                </select>
            </div> -->
            <div class="row">
                <label >Select a vendors</label>
                <select ng-model = "book.ven_id" class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.vendors" value="{{ result.id }}">{{result.name}}</option>
                </select>
            </div>
            <div class="row">
                <label >Select a Problem type</label>
                <select ng-model = "book.t_id"  class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.b_types" value="{{ result.id }}">{{result.name}}</option>

                </select>
            </div>
            <div class="row">
                <label >Select Problem :</label>
                <select  ng-model = "book.p_id"  class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in book.problems" value="{{ result.id }}">{{result.name}}</option>
                </select>
            </div>
            <div class="row">
                <label >Select a date: </label>
                    <input  ng-model="book.date"  type="date" name="date" required>
            </div>
            <div class="row">
                <label >Select a slot: </label>
                <select ng-model = "book.slot" class = "ui dropdown" required>
                    <option value="" disabled selected>Choose your option</option>
                    <option ng-repeat="result in [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" value="{{ result }}">{{result}}</option>
                </select>
            </div>
                                      
            <div class=" col s12">
               <button class="waves-effect waves-light btn" type="submit" name="action">Book Now!!!
                <i class="material-icons">send</i>
                </button>
           </div>
       </form>

{{ book .message }} 
    </div>