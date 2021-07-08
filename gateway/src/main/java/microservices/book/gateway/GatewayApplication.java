package microservices.book.gateway;

import io.netty.resolver.DefaultAddressResolverGroup;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.config.HttpClientCustomizer;
import org.springframework.stereotype.Component;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@SpringBootApplication
public class GatewayApplication {

	@Component
	public class DnsResolutionFixer implements HttpClientCustomizer {
		@Override
		public HttpClient customize(HttpClient httpClient) {
			return httpClient.resolver(DefaultAddressResolverGroup.INSTANCE);
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

}
