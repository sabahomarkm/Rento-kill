# maven-arche-type-template
Maven arche type template

1) Clone this repo 
2) Navigate to the root folder and execute `mvn clean install`.
3) Verify if the archetype is available by executing `mvn archetype:crawl`.
4) Create the porlet using `mvn org.apache.maven.plugins:maven-archetype-plugin:3.1.2:generate -DarchetypeArtifactId="hcl_mx_archetype" -DarchetypeGroupId="com.hcl.mx.base" -DarchetypeVersion="1.0" -DgroupId="com.hcl.dx" -DartifactId="mx-arche-type-portlet"`
5) Navigate to the project folder `mx-arche-type-portlet` and execute `mvn clean package` to create war folder.


