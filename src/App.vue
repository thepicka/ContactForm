<template>
    <div class="Contactform">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <h2 class="heading">Contact Us</h2>
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" v-model="user.name" id="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.name.$error }" />
                                <div v-if="submitted && $v.user.name.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.name.required">Name is required</span>
                                    <span v-if="!$v.user.name.maxLength">Name must be upto 50 characters</span>
                                    <span v-if="!$v.user.name.minLength">Name must be at least 5 characters</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                    <span v-if="!$v.user.email.email">Email is invalid</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subject">Subject</label>
                                <input type="text" v-model="user.subject" id="subject" name="subject" class="form-control" :class="{ 'is-invalid': submitted && $v.user.subject.$error }" />
                                <div v-if="submitted && !$v.user.subject.maxLength" class="invalid-feedback">Subject should be upto 100 character</div>
                            </div>
                           <div class="form-group">
                                <label for="message">Message</label>
                                <input type="text" v-model="user.message" id="message" name="message" class="form-control" :class="{ 'is-invalid': submitted && $v.user.message.$error }" />
                                <div v-if="submitted && $v.user.message.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.message.required">Message is required</span>
                                    <span v-if="!$v.user.message.maxLength">Message should be upto 500 character</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary">SEND</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email, minLength, maxLength } from "vuelidate/lib/validators";
    import axios from "axios";
    export default {
        name: "app",
        data() {
            return {
                user: {
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                },
                submitted: false
            };
        },
        validations: {
            user: {
                name: { required, maxLength: maxLength(50),minLength: minLength(5) },
                email: { required, email },
                subject: { maxLength: maxLength(100)},
                message: { required ,  maxLength: maxLength(500) }

            }
        },
        methods: {
            handleSubmit() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                axios({ method: "POST", "url": "https://5d9f7fe94d823c0014dd323d.mockapi.io/api", "data": JSON.stringify(this.user), "headers": { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                }, error => {
                    console.error(error);
                });
                alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                

                
            }
        }
    };
</script>
<style>
.Contactform{
    background-color: #adb17d;
    border: 1px solid black;
    margin-left: 300px;
    height: 400px;
    text-align: center;
    width:700px;
}
.invalid-feedback{
    color: #c10051;
}
#name{
    margin-left:17px;
    margin-bottom: 10px;
    width:200px;
}
#email{
    margin-left:17px;
    margin-bottom: 10px;
    width:200px;
}
#message{
    height:50px;
    margin-left:5px;
    width:200px;
}
#subject{
    margin-left:10px;
    margin-bottom: 10px;
    width:200px;
}
.btn{
    margin-top:20px;
}
</style>