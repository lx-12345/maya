
public class StringUtils {

	public static String getString(String param){
		return param == null ? "" : param;
	}
	
	public static int getInt(String param){
		if(param == null || "".equals(param)){
			return 0;
		}
		
		try{
			return Integer.parseInt(param);
		}catch (Exception e) {
			return 0;
		}
	}
	
	public static float getFloat(String param){
		if(param == null || "".equals(param)){
			return 0;
		}
		
		try{
			return Float.parseFloat(param);
		}catch (Exception e) {
			return 0;
		}
	}
	
	 /**
	    * 增加了随机函数
	    * @param startNum
	    * @param endNum
	    * @return
	    */
		public static int getRandomNew(int startNum,int endNum){
		    	 int randNum =0;
		      	if(endNum<startNum){
		      		endNum=startNum;
		      	}
		      	randNum=(int)Math.round(Math.random()*(endNum-startNum)+startNum);
		      	return randNum;
		      	
		      }
	
	public static long getLong(String param) {
		if(param == null || "".equals(param)){
			return 0;
		}
		try{
			return Long.parseLong(param);
		}catch (Exception e) {
			return 0;
		}
	}
	
	public static String append(String... params){
		StringBuffer buffer = new StringBuffer();
		for(String param : params){
			buffer.append(param);
		}
		return buffer.toString();
	}
	
	public static void main(String[] args) {
//		String s = "23";
//		float f = Float.parseFloat(s);
//		System.out.println(f);
		int i= 10;
		float f = i/10;
		System.out.println(f);
	}
}
