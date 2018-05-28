

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
public class HttpUtilsNew {
	public static final String GET = "GET";
	public static final String POST = "POST";
	// 签名key
	public final static String SIGNATURE = "sign";
	// 签名方法key
	public final static String SIGN_METHOD = "sign_type";
	// =
	public static final String QSTRING_EQUAL = "=";
	// &
	public static final String QSTRING_SPLIT = "&";
	//用于打印log
	private static AtomicInteger cnt = new AtomicInteger();
	
	public static String sendPostHttps(String url, byte[] body){
		return NetworkManager.request(url, body);
	}
	
	public static void main(String[] args) {
//		rigester();
//		login();
		sendMsg();

	}
	
	public static void rigester() {
		String version = "1";
		String timeStamp = "2018-01-25 12:32:21";
		String mobilePhone = "18701536270";
		String loginPassword = "zhouxiangnan";
		String verifyCode = "123456";
		String invitedCode = "sz49yM";
		String registeType = "1";
		Map<String,String> map = new HashMap<String,String>();
		map.put("version", version);
		map.put("timeStamp", timeStamp);
		map.put("mobilePhone", mobilePhone);
		map.put("loginPassword", loginPassword);
		map.put("invitedCode", invitedCode);
		map.put("verifyCode", verifyCode);
		map.put("registeType", registeType);
		
		String strs = createLinkString(paraFilter(map), true, false);
		
		String md5key = "b2693d9c2124f3ca9547b897794ac6a1";//maya
		
		String sign = md5Summary(strs + md5key);
		map.put("sign", sign);
		
		String strSend = strs + "&sign=" + sign;
		String url = "https://localhost:8087/siteuser/v1/register?";
		
		String result = "";
		String noticeUrl = url + strSend;
		try {
			result = HttpUtilsNew.sendPostHttps(noticeUrl, "".getBytes("utf-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("sendMsg:" + result);
	}
	
	public static void sendMsg() {
		String data = "{\"mobilePhone\":\"18855552252\"}";
		data = AESUtil.encode(data);
		
		String version = "1";
		String timeStamp = "2018-01-25 12:32:21";
		
		Map<String,String> map = new HashMap<String,String>();
		map.put("version", version);
		map.put("timeStamp", timeStamp);
		map.put("data", data);
		
		String strs = createLinkString(paraFilter(map), true, false);
		String md5key = "b2693d9c2124f3ca9547b897794ac6a1";//maya
		String sign = md5Summary(strs + md5key);
		map.put("sign", sign);
		
		String strSend = strs + "&sign=" + sign;
		String url = "https://localhost:8087/siteuser/v1/send_msg?";
		
		String result = "";
		String noticeUrl = url + strSend;
		try {
			result = HttpUtilsNew.sendPostHttps(noticeUrl, "".getBytes("utf-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("sendMsg:" + result);
	}
	
	public static void login() {
		String version = "1";
		String timeStamp = "2018-01-25 12:32:21";
		String loginName = "18701536270";
		String loginPassword = "zhouxiangnan";
		Map<String,String> map = new HashMap<String,String>();
		map.put("version", version);
		map.put("timeStamp", timeStamp);
		map.put("loginName", loginName);
		map.put("loginPassword", loginPassword);
		
		String strs = createLinkString(paraFilter(map), true, false);
		String md5key = "b2693d9c2124f3ca9547b897794ac6a1";//maya
		String sign = md5Summary(strs + md5key);
		map.put("sign", sign);
		
		String strSend = strs + "&sign=" + sign;
		String url = "https://localhost:8087/siteuser/v1/login?";
		
		String result = "";
		String noticeUrl = url + strSend;
		try {
			result = HttpUtilsNew.sendPostHttps(noticeUrl, "".getBytes("utf-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("login:" + result);
	}
	
	/**
	 * 除去请求要素中的空值和签名参数
	 * 
	 * @param para
	 *            请求要素
	 * @return 去掉空值与签名参数后的请求要素
	 */
	public static Map<String, String> paraFilter(Map<String, String> para) {

		Map<String, String> result = new HashMap<String, String>();

		if (para == null || para.size() <= 0) {
			return result;
		}

		for (String key : para.keySet()) {
			String value = para.get(key);
			if (value == null || value.equals("")
					|| key.equalsIgnoreCase(SIGNATURE)
					|| key.equalsIgnoreCase(SIGN_METHOD)) {
				continue;
			}
			result.put(key, value);
		}

		return result;
	}

	/**
	 * 把请求要素按照“参数=参数值”的模式用“&”字符拼接成字符串
	 * 
	 * @param para
	 *            请求要素
	 * @param sort
	 *            是否需要根据key值作升序排列
	 * @param encode
	 *            是否需要URL编码
	 * @return 拼接成的字符串
	 */
	public static String createLinkString(Map<String, String> para,
			boolean sort, boolean encode) {

		List<String> keys = new ArrayList<String>(para.keySet());

		if (sort)
			Collections.sort(keys);

		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < keys.size(); i++) {
			String key = keys.get(i);
			String value = para.get(key);

			if (encode) {
				try {
					value = URLEncoder.encode(value, "utf-8");
				} catch (UnsupportedEncodingException e) {
				}
			}

			if (i == keys.size() - 1) {// 拼接时，不包括最后一个&字符
				sb.append(key).append(QSTRING_EQUAL).append(value);
			} else {
				sb.append(key).append(QSTRING_EQUAL).append(value)
						.append(QSTRING_SPLIT);
			}
		}
		return sb.toString();
	}

	/**
	 * 对传入的参数进行MD5摘要
	 * 
	 * @param str
	 *            需进行MD5摘要的数据
	 * @return MD5摘要值
	 */
	public static String md5Summary(String str) {

		if (str == null) {
			return null;
		}

		MessageDigest messageDigest = null;

		try {
			messageDigest = MessageDigest.getInstance("MD5");
			messageDigest.reset();
			messageDigest.update(str.getBytes("utf-8"));
		} catch (NoSuchAlgorithmException e) {

			return str;
		} catch (UnsupportedEncodingException e) {
			return str;
		}

		byte[] byteArray = messageDigest.digest();

		StringBuffer md5StrBuff = new StringBuffer();

		for (int i = 0; i < byteArray.length; i++) {
			if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)
				md5StrBuff.append("0").append(
						Integer.toHexString(0xFF & byteArray[i]));
			else
				md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
		}

		return md5StrBuff.toString();
	}
}
