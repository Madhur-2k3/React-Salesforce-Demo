// ── Create Sample Accounts ──
List<Account> accounts = new List<Account>();
accounts.add(new Account(Name='Acme Corporation', Industry='Technology', Phone='(555) 123-4567', Type='Customer - Direct', AnnualRevenue=5000000, Website='https://acme.com', BillingCity='San Francisco', BillingState='CA', BillingCountry='USA'));
accounts.add(new Account(Name='Globex Industries', Industry='Manufacturing', Phone='(555) 234-5678', Type='Customer - Channel', AnnualRevenue=12000000, Website='https://globex.com', BillingCity='Chicago', BillingState='IL', BillingCountry='USA'));
accounts.add(new Account(Name='Stark Enterprises', Industry='Energy', Phone='(555) 345-6789', Type='Customer - Direct', AnnualRevenue=85000000, BillingCity='New York', BillingState='NY', BillingCountry='USA'));
accounts.add(new Account(Name='Wayne Technologies', Industry='Technology', Phone='(555) 456-7890', Type='Prospect', AnnualRevenue=42000000, BillingCity='Gotham', BillingState='NJ', BillingCountry='USA'));
accounts.add(new Account(Name='Umbrella Corp', Industry='Biotechnology', Phone='(555) 567-8901', Type='Customer - Direct', AnnualRevenue=23000000, BillingCity='Raccoon City', BillingState='CO', BillingCountry='USA'));
accounts.add(new Account(Name='Cyberdyne Systems', Industry='Technology', Phone='(555) 678-9012', Type='Prospect', AnnualRevenue=67000000, BillingCity='Los Angeles', BillingState='CA', BillingCountry='USA'));
accounts.add(new Account(Name='Wonka Industries', Industry='Food & Beverage', Phone='(555) 789-0123', Type='Customer - Channel', AnnualRevenue=15000000, BillingCity='Denver', BillingState='CO', BillingCountry='USA'));
accounts.add(new Account(Name='Initech Solutions', Industry='Consulting', Phone='(555) 890-1234', Type='Other', AnnualRevenue=8000000, BillingCity='Austin', BillingState='TX', BillingCountry='USA'));
accounts.add(new Account(Name='Pied Piper Inc', Industry='Technology', Phone='(555) 901-2345', Type='Prospect', AnnualRevenue=3000000, BillingCity='Palo Alto', BillingState='CA', BillingCountry='USA'));
accounts.add(new Account(Name='Hooli Global', Industry='Technology', Phone='(555) 012-3456', Type='Customer - Direct', AnnualRevenue=95000000, Website='https://hooli.com', BillingCity='Mountain View', BillingState='CA', BillingCountry='USA'));
insert accounts;
System.debug('✅ Created ' + accounts.size() + ' Accounts');

// ── Create Sample Contacts (linked to Accounts above) ──
List<Contact> contacts = new List<Contact>();
contacts.add(new Contact(FirstName='Tony', LastName='Stark', Email='tony@stark.com', Phone='(555) 111-1001', AccountId=accounts[2].Id));
contacts.add(new Contact(FirstName='Pepper', LastName='Potts', Email='pepper@stark.com', Phone='(555) 111-1002', AccountId=accounts[2].Id));
contacts.add(new Contact(FirstName='Bruce', LastName='Wayne', Email='bruce@wayne.com', Phone='(555) 222-2001', AccountId=accounts[3].Id));
contacts.add(new Contact(FirstName='Lucius', LastName='Fox', Email='lucius@wayne.com', Phone='(555) 222-2002', AccountId=accounts[3].Id));
contacts.add(new Contact(FirstName='Richard', LastName='Hendricks', Email='richard@piedpiper.com', Phone='(555) 333-3001', AccountId=accounts[8].Id));
contacts.add(new Contact(FirstName='Erlich', LastName='Bachman', Email='erlich@piedpiper.com', Phone='(555) 333-3002', AccountId=accounts[8].Id));
contacts.add(new Contact(FirstName='Gavin', LastName='Belson', Email='gavin@hooli.com', Phone='(555) 444-4001', AccountId=accounts[9].Id));
contacts.add(new Contact(FirstName='Wile', LastName='Coyote', Email='wile@acme.com', Phone='(555) 555-5001', AccountId=accounts[0].Id));
contacts.add(new Contact(FirstName='Road', LastName='Runner', Email='road@acme.com', Phone='(555) 555-5002', AccountId=accounts[0].Id));
contacts.add(new Contact(FirstName='Hank', LastName='Scorpio', Email='hank@globex.com', Phone='(555) 666-6001', AccountId=accounts[1].Id));
contacts.add(new Contact(FirstName='Albert', LastName='Wesker', Email='wesker@umbrella.com', Phone='(555) 777-7001', AccountId=accounts[4].Id));
contacts.add(new Contact(FirstName='Willy', LastName='Wonka', Email='willy@wonka.com', Phone='(555) 888-8001', AccountId=accounts[6].Id));
contacts.add(new Contact(FirstName='Charlie', LastName='Bucket', Email='charlie@wonka.com', Phone='(555) 888-8002', AccountId=accounts[6].Id));
contacts.add(new Contact(FirstName='Peter', LastName='Gibbons', Email='peter@initech.com', Phone='(555) 999-9001', AccountId=accounts[7].Id));
contacts.add(new Contact(FirstName='Miles', LastName='Dyson', Email='miles@cyberdyne.com', Phone='(555) 000-0001', AccountId=accounts[5].Id));
insert contacts;
System.debug('✅ Created ' + contacts.size() + ' Contacts');
