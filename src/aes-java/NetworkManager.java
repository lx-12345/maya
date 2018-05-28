

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.cert.X509Certificate;
import java.util.Map;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class NetworkManager {
	
	
    static TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
		@Override
		public void checkClientTrusted(final X509Certificate[] chain,
				final String authType) {
		}

		@Override
		public void checkServerTrusted(final X509Certificate[] chain,
				final String authType) {
		}

		@Override
		public X509Certificate[] getAcceptedIssuers() {
			return null;
		}
	} };
    
	
	
	public static String request(String requestUrl,byte[] params){
		HttpURLConnection httpConnect = null;
		String strResponse = "";
		int connectTimeout = 30 * 1000;
		int readTimeout = 30 * 1000;
		try {
			requestUrl = requestUrl.replaceAll(" ", "%20");
			
			URL url = new URL(requestUrl);
			
			SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(null, trustAllCerts,
					new java.security.SecureRandom());
			
			SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
			
			if (requestUrl.startsWith("https://")) {
				HttpsURLConnection
				.setDefaultHostnameVerifier(new HostnameVerifier() {
					public boolean verify(String hostname,
							SSLSession session) {
						return true;
					}
				});
			}
			
			httpConnect = (HttpURLConnection) url.openConnection();
			
			if (httpConnect instanceof HttpsURLConnection) {
				((HttpsURLConnection) httpConnect).setSSLSocketFactory(sslSocketFactory);
			}			
			httpConnect.setRequestMethod("POST");
			httpConnect.setConnectTimeout(connectTimeout);
			httpConnect.setReadTimeout(readTimeout);
			httpConnect.setDoOutput(true);
			httpConnect.setUseCaches(false);
			httpConnect.setInstanceFollowRedirects(true);
			
			httpConnect.connect();
			
			OutputStream outputStream = httpConnect.getOutputStream();
			
			outputStream.write(params);
			outputStream.flush();
			outputStream.close();
			
			InputStream content = httpConnect.getInputStream();
			strResponse = convertStreamToString(content);
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(httpConnect != null){
				try {
					httpConnect.disconnect();
				} catch (Exception e) {
				}
				httpConnect = null;
			}
		}
		return strResponse;
	}
	public static String request(String requestUrl){
		HttpURLConnection httpConnect = null;
		String strResponse = null;
		int connectTimeout = 30 * 1000;
		int readTimeout = 30 * 1000;
		try {
			requestUrl = requestUrl.replaceAll(" ", "%20");
			
			URL url = new URL(requestUrl);
			
			SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(null, trustAllCerts,
					new java.security.SecureRandom());
			
			SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
			
			if (requestUrl.startsWith("https://")) {
				HttpsURLConnection
				.setDefaultHostnameVerifier(new HostnameVerifier() {
					public boolean verify(String hostname,
							SSLSession session) {
						return true;
					}
				});
			}
			
			httpConnect = (HttpURLConnection) url.openConnection();
			
			if (httpConnect instanceof HttpsURLConnection) {
				((HttpsURLConnection) httpConnect).setSSLSocketFactory(sslSocketFactory);
			}			
			
			httpConnect.setConnectTimeout(connectTimeout);
			httpConnect.setReadTimeout(readTimeout);
			httpConnect.setDoOutput(true);
			httpConnect.setUseCaches(false);
			httpConnect.setInstanceFollowRedirects(true);
			
			httpConnect.connect();
			
			
			
			InputStream content = httpConnect.getInputStream();
			strResponse = convertStreamToString(content);
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(httpConnect != null){
				try {
					httpConnect.disconnect();
				} catch (Exception e) {
				}
				httpConnect = null;
			}
		}
		return strResponse;
	}

    public static String convertStreamToString(InputStream is) {
    	byte[] buff = new byte[4096];
    	int readed = 0;
    	ByteArrayOutputStream bout = new ByteArrayOutputStream();
    	try {
			while((readed = is.read(buff)) != -1){
				bout.write(buff, 0, readed);
			}
		} catch (IOException e1) {
		}
    	try {
			return new String(bout.toByteArray(), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return new String(bout.toByteArray());
		}
	}
    public static String parseXMLGetValueByKey(String key,String xmlContent){
		String value = null;
		try {
			String startStr = "<"+key+">";
			String endStr = "</"+key+">";
			int beginIndex = xmlContent.indexOf(startStr);
			if(beginIndex == -1){
				return null;
			}
			int endIndex = xmlContent.indexOf(endStr);
			value = xmlContent.substring(beginIndex+startStr.length(), endIndex);
			return value;
		} catch (Exception e) {
			return "";
		}
	}
    public static String packagingXML(Map<String,String> xmlMap,String xmlHead,boolean isAddStandalone){
    	if(xmlMap!= null && xmlMap.size() >0){
    		StringBuilder xmlSbu = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    		if(isAddStandalone){
    			xmlSbu = new StringBuilder("<?xml version=\"1.0\" standalone=\"yes\"?>");
    		}
    		xmlSbu.append("<"+xmlHead+">");
    		for(Map.Entry<String, String> entry : xmlMap.entrySet()){
    			xmlSbu.append("<"+entry.getKey()+">").append(entry.getValue()).append("</"+entry.getKey()+">");
    		}
    		xmlSbu.append("</"+xmlHead+">");
    		return xmlSbu.toString(); 
    	}
    	return null;
    }
    public static String packagingXMLField(Map<String,String> fieldMap){
    	if(fieldMap != null && fieldMap.size() >0){
    		StringBuilder sbu = new StringBuilder();
    		for(Map.Entry<String, String> entry : fieldMap.entrySet()){
    			sbu.append("<"+entry.getKey()+">").append(entry.getValue()).append("</"+entry.getKey()+">");
    		}
    		return sbu.toString();
    	}
    	return null;
    }
    
    
}
