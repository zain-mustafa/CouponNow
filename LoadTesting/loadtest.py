from locust import HttpLocust, TaskSet, task


class MobileCustomerBehaviour(TaskSet):

    def on_start(self):
        self.login()

    def login(self):
        self.client.post("/mobile/login", {"email" : "dillon@test.com", "password" : "testTEST1"}, name="Customer Login")
    
    @task(1)
    def coupons(self):
        self.client.get("/mobile/coupons?latitude=42.306095&longitude=-82.813049&radius=25", name="Get Coupons")


class BusinessOwnerBehaviour(TaskSet):

    def on_start(self):
        self.login()

    def login(self):
        self.client.post("/customer/login", {"email" : "businesstest@dillon.com", "password" : "testTEST1"}, name="Business Owner Login")

    # @task(1)
    # def index(self):
    #     self.client.get("http://13.59.105.105:4200", name="Business Owner Index")

    @task(1)
    def list_businesses(self):
        self.client.post("/owner/listbusiness", {"owneremail" : "businesstest@dillon.com"})


class MobileCustomer(HttpLocust):
    host = "http://13.59.105.105:3000"
    weight = 10
    task_set = MobileCustomerBehaviour
    min_wait = 60000
    max_wait = 60000


class BusinessOwner(HttpLocust):
    host = "http://13.59.105.105:3000"
    weight = 1
    task_set = BusinessOwnerBehaviour
    min_wait = 5000
    max_wait = 20000